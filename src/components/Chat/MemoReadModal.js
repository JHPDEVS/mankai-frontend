
import {
  Badge,
  CircularProgress,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useState, Fragment, useEffect } from 'react'
import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import SunEditor from 'suneditor-react'
import MemoDetailImages from '../../layouts/MemoDetailImages'
function MemoReadModal(props) {
  const { t } = useTranslation(['lang'])
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.Reducers.user)
  const [memoTitle, setMemoTitle] = useState(null);
  const [selectedImage,setSelectedImage] = useState([])

  useEffect(() => {
    if(props.memo) {
      setMemoTitle(props.memo.memo_title);
    }
  },[props])

  useEffect(() => {
    console.log(memoTitle);
  }, [memoTitle])

  useEffect(()=>{
    if(props.open === true){
      console.log(props.memo.id)
    axios.get('/api/getmemoimages/'+props.memo.id)
      .then((res)=>{
        if(res.data.length == 0)
           setSelectedImage("No Data")
          if(res.data.length >= 1 ){
          for(let i = 0 ; i < res.data.length ; i++){
            setSelectedImage(images => [...images, res.data[i].url]);
          }            
          }
          console.log(res.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    } 
    else{
      setSelectedImage([])
    }
  },[props.open])

  const myMemoUpdate = (e) => {
    // console.log(JSON.parse(props.memos).id);
    console.log(props.memo);
    axios.post('api/storememo', {
      user_id : currentUser.id,
      content_text : props.memo.content_text,
      memo_title : memoTitle,
      memo_type : props.memo.type
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: 'ADD_MEMO',
        payload: { memo: res.data },
      })
      props.handleClose(e);
    }).catch(err => {
      console.log(err);
    })

  }

  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.handleClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl shadow border dark:bg-gray-900">
              <div className="flex justify-end ">
                <button
                  type="button"
                  onClick={props.handleClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="container mx-auto">
                <div className="font-bold text-xl p-2 oveflow-x-auto">
                <input value={memoTitle} onChange={e => setMemoTitle(e.target.value)} />
                </div>
                <hr style={{
                    width:'100%',
                    marginTop:6
                }}/>
                <div className="flex flex-col overflow-y-auto h-96 px-2">
                  {/* { props.memo ? 
                    props.memo.content_text
                   : ''
                  }
                  {selectedImage == ''
                    ?<div className='flex justify-center'><Skeleton variant="rectangular" width={595} height={400} /></div>
                    :selectedImage != 'No Data'
                        ?<div className='flex justify-center'><MemoDetailImages imageList={selectedImage}/></div>   
                        :<div></div>
                  } */}
                  {
                    props.memo ?  
                      props.memo.type === 'SNS' ?
                      <div>
                        {props.memo.content_text}
                        {selectedImage == ''
                        ?<div className='flex justify-center'><Skeleton variant="rectangular" width={595} height={400} /></div>
                        :selectedImage != 'No Data'
                            ?<div className='flex justify-center'><MemoDetailImages imageList={selectedImage}/></div>   
                            :''}
                      </div> :
                      <SunEditor 
                      readOnly
                      hideToolbar 
                      height="500" 
                      defaultValue={props.memo.content_text}/>
                      
                    : ''  
                  }

                </div>
              </div>
              <div className="flex justify-center py-2">
                <button
                  onClick={e => myMemoUpdate(e)}
                  className=" px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  내 메모에 저장
                </button>
                <button
                  type="button"
                  className="ml-2 px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={props.handleClose}
                >
                  취소
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
 
  )
}
export default MemoReadModal
