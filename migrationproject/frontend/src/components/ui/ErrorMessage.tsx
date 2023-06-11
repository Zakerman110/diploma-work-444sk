import {FieldError} from "react-hook-form";

type ErrorMessageProps = {
    error: FieldError | string[] | undefined;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {

    if (!error) return null

    if (Array.isArray(error)) {
        return (
            <ul className="text-red-500 text-xs italic">
                {error.map((errorMessage, index) => (
                    <li key={index}>{errorMessage}</li>
                ))}
            </ul>
        );
    }

    return <p className="text-red-500 text-xs italic">{error.message}</p>;
}

export default ErrorMessage