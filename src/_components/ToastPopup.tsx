import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastPopup({
  message,
  position,
  color,
}: {
  message: string;
  position: "top" | "bottom";
  color: "red" | "green";
}) {
  return createPortal(
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="absolute top-10 flex h-[100dvh] w-[100dvw] justify-center py-[30px] xl:py-[50px]"
      >
        <div
          className={`absolute flex h-[4rem] max-w-[500px] items-center justify-center rounded-[1rem] ${color === "red" ? "bg-primary-red-200" : "bg-primary-green-200"} opacity-[80%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)] ${
            position === "top" ? "animate-toast-top" : "animate-toast-bottom"
          }`}
        >
          <p className="text-Body px-[40px] text-white">{message}</p>
        </div>
      </motion.aside>
    </AnimatePresence>,
    document.body,
  );
}
