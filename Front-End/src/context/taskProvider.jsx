import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TaskContext from "./taskContext";
import { useToast } from "@chakra-ui/react";
import { API } from "../services/api";

const { Provider } = TaskContext;

export const TaskProvider = ({ children }) => {
	const toast = useToast();
	const getTodayDate = () => new Date().toLocaleDateString("pt-BR");

	const [tasks, setTasks] = useState(() => {
		// Recupera as tarefas do localStorage ou usa um array vazio
		const storedTasks = localStorage.getItem("tasks");
		return storedTasks ? JSON.parse(storedTasks) : [];
	});

	const [sendToApproval, setSendToApproval] = useState(() => {
		// Recupera o estado de "sendToApproval" do localStorage ou usa "false"
		const storedSendToApproval = localStorage.getItem("sendToApproval");
		return storedSendToApproval ? JSON.parse(storedSendToApproval) : false;
	});

	const [tasksLoadedToday, setTasksLoadedToday] = useState(() => {
		// Recupera a data de carregamento das tarefas do localStorage ou usa "false"
		const storedTasksLoadedDate = localStorage.getItem("tasksLoadedDate");
		return storedTasksLoadedDate ? JSON.parse(storedTasksLoadedDate) : false;
	});

	const [approvedTasks, setApprovedTasks] = useState(() => {
		const storedApprovedTasks = localStorage.getItem("approvedTasks");
		return storedApprovedTasks ? JSON.parse(storedApprovedTasks) : [];
	});

	const [paymentRequest, setPaymentRequest] = useState(() => {
		const storedPaymentRequest = localStorage.getItem("paymentRequest");
		return storedPaymentRequest ? JSON.parse(storedPaymentRequest) : [];
	});

	const [penalties, setPenalties] = useState(() => {
		const storedPenalties = localStorage.getItem("penalties");
		return storedPenalties ? JSON.parse(storedPenalties) : [];
	});
	
	const [withdrawal, setWithdrawal] = useState(() => {
		const storedWithdrawal = localStorage.getItem("withdrawal");
		return storedWithdrawal ? JSON.parse(storedWithdrawal) : false;
	});

	const [loading, setLoading] = useState(false);

	// Salva as tarefas, a data e outros estados no localStorage sempre que mudam
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
		localStorage.setItem("tasksLoadedDate", JSON.stringify(tasksLoadedToday));
		localStorage.setItem("sendToApproval", JSON.stringify(sendToApproval));
		localStorage.setItem("approvedTasks", JSON.stringify(approvedTasks));
		localStorage.setItem("paymentRequest", JSON.stringify(paymentRequest));
		localStorage.setItem("penalties", JSON.stringify(penalties));
		localStorage.setItem("today", getTodayDate());
		localStorage.setItem("withdrawal", JSON.stringify(withdrawal));
	}, [
		tasks,
		tasksLoadedToday,
		sendToApproval,
		approvedTasks,
		penalties,
		paymentRequest,
		withdrawal,
	]);

	// Monitora a chegada de um novo dia para limpar as tarefas
	const checkNewDay = setInterval(() => {
		const today = getTodayDate();
		if (tasksLoadedToday && tasksLoadedToday !== today) {
			// Reseta o estado se a data mudou
			setTasksLoadedToday(false);
			setSendToApproval(false);
			localStorage.removeItem("approvalDate");
			localStorage.setItem("tasksLoadedDate", JSON.stringify(false));
		}
	}, 10000 * 60);

	// Limpa o timeout
	useEffect(() => {
		return () => clearInterval(checkNewDay);
	}, [tasksLoadedToday, checkNewDay]);

	// Carregar tarefas
	const handleLoadTasks = useCallback(async () => {
		const today = getTodayDate();
		try {
			setLoading(true);
			const response = await API.get("/tasks");
			const tasksApi = response.data;
			setTasks(tasksApi);
			localStorage.setItem("tasks", JSON.stringify(tasksApi));
			setTasksLoadedToday(today);
		} catch (error) {
			toast({
				title: "Erro ao carregar tarefas.",
				description: error.message,
				status: "error",
				duration: 3000,
			});
		} finally {
			setLoading(false);
		}
	}, [toast]);

	// Carregar punições
	const handleLoadPenalties = useCallback(async () => {
		try {
			const response = await API.get("/punishments");
			const penaltiesApi = response.data;
			setPenalties(penaltiesApi);
		} catch (error) {
			toast({
				title: "Erro ao carregar punições.",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "bottom",
			});
			console.error(error);
		}
	}, [toast]);

	// //Toggle para aprovar/reprovar tarefas
	const handleToggleTask = useCallback(
		(taskId) => {
			try {
				const tasksToApproval = tasks.map((task) =>
					task.id === taskId
						? {
								...task,
								status: task.status === "completed" ? "pending" : "completed",
						  }
						: task
				);
				setTasks(tasksToApproval);
			} catch (error) {
				toast({
					title: "Erro ao atualizar tarefa.",
					description: error.message,
					status: "error",
					duration: 3000,
					position: "bottom",
				});
			}
		},
		[toast, tasks]
	);

	// Toogle para incluir/remover penalidades
	const togglePenalty = useCallback(
		async (penaltyId) => {
			try {
				await API.patch(`/punishment/${penaltyId}/toggle`);
				setPenalties((prevPenalties) =>
					prevPenalties.map((penalty) =>
						penalty.id === penaltyId
							? { ...penalty, add: !penalty.add }
							: penalty
					)
				);
			} catch (error) {
				toast({
					title: "Erro ao atualizar penalidade.",
					description: error.message,
					status: "error",
					duration: 3000,
					position: "bottom",
				});
			}
		},
		[toast]
	);

	// Marcar todas as tarefas como concluídas
	const handleCompleteAllTasks = useCallback(async () => {
		try {
			setTasks((prevTasks) =>
				prevTasks.map((task) => ({ ...task, status: "completed" }))
			);
			toast({
				title: "Todas as tarefas foram concluídas!",
				description: "Você concluiu todas as tarefas do dia.",
				status: "success",
				duration: 3000,
				position: "bottom",
			});
		} catch (error) {
			toast({
				title: "Erro ao concluir tarefas.",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "bottom",
			});
		}
	}, [toast]);

	// Enviar aprovação / Tarefas completadas + penalidades
	const handleApproval = useCallback(async () => {
		try {
			const tasks = sendToApproval.filter((task) => task.status === "completed");
			const punishment = penalties.filter((penalty) => penalty.add === true);
			const tasksValue = tasks.reduce((acc, task) => acc + task.value, 0);
			const punishmentValue = punishment.reduce((acc, penalty) => acc + penalty.value, 0);
			const netValue = tasksValue - punishmentValue;
	
			const approvalEntry =
				{
					date: new Date(),
					tasks,
					penalties: punishment,
					netValue,
				}

			// Enviar dados ao back-end
			await API.post("/approvals", approvalEntry);
	
			// Atualiza estados locais
			setPaymentRequest([approvalEntry]);
			setApprovedTasks([]);
			setTasks([]);
			setPenalties([]);
			setSendToApproval([]);
	
			toast({
				title: "Aprovação enviada!",
				description: "Os dados foram enviados com sucesso.",
				status: "success",
				duration: 3000,
				position: "bottom",
			});
		} catch (error) {
			toast({
				title: "Erro ao enviar aprovação.",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "bottom",
			});
		}
	}, [toast, setApprovedTasks, setTasks, setPenalties, setSendToApproval, sendToApproval, penalties]);

	// Solicitar pagamento
	const handleRequestPayment = useCallback(async () => {
		const totalValue = paymentRequest
			.map((task) => task.netValue)
			.reduce((acc, value) => acc + value, 0);
	
		if (totalValue === 0) {
			toast({
				title: "Nenhum valor acumulado.",
				description: "Você ainda não realizou nenhuma tarefa aprovada.",
				status: "error",
				duration: 3000,
				position: "top",
			});
			return;
		}
	
		try {
			// Enviar solicitação de pagamento ao back-end
			await API.post("/payments-request", { totalValue });
	
			// Remove dados locais e atualiza estados
			localStorage.removeItem("approvedTasks");
			setWithdrawal(true);
			setApprovedTasks([]);
	
			toast({
				title: "Solicitação enviada!",
				description: `Você solicitou o pagamento de R$ ${totalValue}.`,
				status: "success",
				duration: 3000,
				position: "top",
			});
		} catch (error) {
			toast({
				title: "Erro ao solicitar pagamento.",
				description: error.message,
				status: "error",
				duration: 3000,
				position: "top",
			});
		}
	}, [toast, paymentRequest]);
	
	// const handleRequestPayment = useCallback(() => {
	// 	const totalValue = paymentRequest.map((task) => task.netValue).reduce((acc, value) => acc + value, 0);

	// 	if (totalValue === 0) {
	// 		toast({
	// 			title: "Nenhum valor acumulado.",
	// 			description: "Você ainda não realizou nenhuma tarefa aprovada.",
	// 			status: "error",
	// 			duration: 3000,
	// 			position: "top",
	// 		});
	// 		return;
	// 	}

	// 	localStorage.removeItem("approvedTasks");
	// 	setWithdrawal(true);

	// 	toast({
	// 		title: "Solicitação enviada!",
	// 		description: `Você solicitou o pagamento de R$ ${totalValue}.`,
	// 		status: "success",
	// 		duration: 3000,
	// 		position: "top",
	// 	});

	// 	// Zera as tarefas aprovadas
	// 	setApprovedTasks([]);
	// }, [toast, paymentRequest]);

	const handleWithdrawal = useCallback(() => {
		setTasks([]);
		setApprovedTasks([]);
		setPenalties([]);
		setSendToApproval([]);
		setPaymentRequest([]);
		setWithdrawal(false);
		toast({
			title: "Pagamento efetuado!",
			description: "Pagamento foi efetuado com sucesso.",
			status: "success",
			duration: 3000,
			position: "top",
		});
	}, [toast]);

	const store = useMemo(
		() => ({
			tasks,
			setTasks,
			sendToApproval,
			setSendToApproval,
			tasksLoadedToday,
			setTasksLoadedToday,
			approvedTasks,
			setApprovedTasks,
			penalties,
			setPenalties,
			loading,
			setLoading,
			handleLoadTasks,
			handleLoadPenalties,
			handleToggleTask,
			handleCompleteAllTasks,
			handleApproval,
			togglePenalty,
			paymentRequest,
			setPaymentRequest,
			handleRequestPayment,
			handleWithdrawal,
			withdrawal,
			setWithdrawal,
		}),
		[
			tasks,
			setTasks,
			sendToApproval,
			setSendToApproval,
			tasksLoadedToday,
			setTasksLoadedToday,
			approvedTasks,
			setApprovedTasks,
			penalties,
			setPenalties,
			loading,
			setLoading,
			handleLoadTasks,
			handleLoadPenalties,
			handleToggleTask,
			handleCompleteAllTasks,
			handleApproval,
			togglePenalty,
			paymentRequest,
			setPaymentRequest,
			handleRequestPayment,
			handleWithdrawal,
			withdrawal,
			setWithdrawal,
		]
	);

	return <Provider value={store}>{children}</Provider>;
};

export default TaskProvider;

TaskProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
