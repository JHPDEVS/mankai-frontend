import { useEffect } from "react";

function Message({message: message, user: user}) {
    useEffect(() => {
        // console.log(user);
    }, [user]);
    return (
        <div className={user.Reducers.user.id === message.user.id ? 'flex p-1 mr-2 justify-end' : 'flex p-1 ml-2 justify-start'}>
            {message.message}
        </div>
    );
}export default Message;