import {FieldError} from "react-hook-form";

const ErrorMessage = ({error}:{error: FieldError | undefined}) => {

    if (!error) return null

    return(
        error && <p className="text-red-500 text-xs italic" >{error.message}</p>
    )
}

export default ErrorMessage