import { motion } from "framer-motion";
import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface AlertModalProps {
	message: string;
	type: "success" | "error";
	onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, type, onClose }) => {
	const isSuccess = type === "success";

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				className={`modal-box bg-base-200 shadow-2xl rounded-2xl p-8 max-w-md w-full mx-4"}`}
			>
				<div className="text-center">
					{isSuccess ? (
						<FaCheckCircle className="text-success text-6xl mx-auto mb-6" />
					) : (
						<FaExclamationCircle className="text-error text-6xl mx-auto mb-6" />
					)}
					<h3
						className={`font-bold text-3xl ${isSuccess ? "text-success" : "text-error"}`}>
						{isSuccess ? "Success!" : "Oops!"}
					</h3>
					<p className="py-4 text-lg text-base-content/80">{message}</p>
				</div>
				<div className="modal-action justify-center mt-6">
					<button
						onClick={onClose}
						className={`btn ${isSuccess ? "btn-success" : "btn-error"} btn-wide text-lg`}>
						Got it!
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default AlertModal;