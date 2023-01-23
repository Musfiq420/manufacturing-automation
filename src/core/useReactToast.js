import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const funcReactToast = () => {
    let id = 0;

    const warn = () => {
        id = toast.warn('Loading...', {position: "bottom-center", autoClose: false});
    }

    const success = () => {
        toast.success('Success', {position: "bottom-center", autoClose: 2000});
    }

    const error = () => {
        toast.error('Login Failed', {position: "bottom-center", autoClose: 2000});
    }

    const del = () => {
        toast.dismiss(id);
    }


    return {
        id,
        warn,
        success,
        error,
        del
    };
}

export default funcReactToast;