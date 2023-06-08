const StatusLabel = ({status}:{status: string}) => {

    let statusClass = '';

    // Set the appropriate className based on the status value
    if (status === 'Pending') {
        statusClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    } else if (status === 'Approved') {
        statusClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    } else if (status === 'Declined') {
        statusClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }

    return(
        <span className={`${statusClass} text-lg font-semibold mr-2 px-2.5 py-0.5 rounded w-min mb-1`}>{status}</span>
    )
}

export default StatusLabel