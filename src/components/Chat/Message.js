import { Avatar } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { useEffect } from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
function Message({ message: message, user: user }) {
  useEffect(() => {
    // console.log(user);
  }, [user])
  return (
    <div
      className={
        user.id === message.user.id
          ? 'flex p-1 mr-2 justify-end relative'
          : 'flex p-1 mr-2 justify-start relative'
      }
    >
      {user.id != message.user.id ? (
        <>
          <div className="">
            {message.user.profile ? (
              <img
                src={message.user.profile_photo_url}
                alt="Avatar"
                class="w-10 h-10 rounded-full"
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: indigo[300],
                }}
              >
                {message.user.name.substring(0, 1)}
              </Avatar>
            )}
          </div>
          <div className="flex max-w-[50%]">
            <div className="flex flex-col text-left ml-2">
              <div className="ml-2 ">
                <span>{message.user.name}</span>
              </div>
              <div className=" py-3 px-4 bg-white  border-b rounded-xl border">
                {message.message ? null : message.file.startsWith('[') ? (
                  JSON.parse(message.file).map((image, index) => (
                    <img
                      key={index}
                      className="w-1/2"
                      src={'http://localhost:8000/storage/' + image}
                    />
                  ))
                ) : message.file.startsWith('images') ? (
                  <img
                    className="w-full"
                    src={'http://localhost:8000/storage/' + message.file}
                  />
                ) : (
                  <a
                    className="border"
                    href={'http://localhost:8000/storage/' + message.file}
                  >
                    {message.file.split('_')[1]}
                  </a>
                )}

                <span className="break-all break-word">{message.message}</span>
              </div>
            </div>

            <span class="flex items-end ml-1">
              <Moment format="H:mm" local>
                {message.created_at}
              </Moment>
            </span>
          </div>
        </>
      ) : null}

      {/* 자신이 타이핑한 메세지 */}
      {user.id === message.user.id ? (
        <>
          <div className="relative">
            <span class="absolute bottom-0 right-2">
              <Moment format="H:mm" local>
                {message.created_at}
              </Moment>
            </span>
          </div>
          <div className="text-left mr-2 py-3 px-4 bg-indigo-100  border-b rounded-xl border max-w-[50%]">
            {message.message ? null : message.file.startsWith('[') ? (
              JSON.parse(message.file).map((image, index) => (
                <img
                  key={index}
                  className="w-1/2"
                  src={'http://localhost:8000/storage/' + image}
                />
              ))
            ) : message.file.startsWith('images') ? (
              <img
                className="w-full"
                src={'http://localhost:8000/storage/' + message.file}
              />
            ) : (
              <a
                className="border"
                href={'http://localhost:8000/storage/' + message.file}
              >
                {message.file.split('_')[1]}
              </a>
            )}

            <span className="break-all break-word">{message.message}</span>
          </div>
        </>
      ) : null}
    </div>
  )
}
export default Message
