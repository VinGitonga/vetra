import { useToastDispatchContext } from "../../context/ToastContext";
import ErrorToast from "./toasts/Error";
import SuccessToast from "./toasts/Success";

export default function Toast({ type, message, id }) {
    const dispatch = useToastDispatchContext();

    function getToast(type) {
        switch (type) {
            case "success":
                return (
                    <SuccessToast
                        message={message}
                        dispatch={dispatch}
                        id={id}
                    />
                );
            case "error":
                return (
                    <ErrorToast message={message} dispatch={dispatch} id={id} />
                );
        }
    }

    return getToast(type);
}
