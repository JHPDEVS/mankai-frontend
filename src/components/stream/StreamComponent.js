import React, { Component } from 'react'
import './StreamComponent.css'
import OvVideoComponent from './OvVideo'

import MicOff from '@mui/icons-material/MicOff'
import VideocamOff from '@mui/icons-material/VideocamOff'
import VolumeUp from '@mui/icons-material/VolumeUp'
import VolumeOff from '@mui/icons-material/VolumeOff'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import HighlightOff from '@mui/icons-material/HighlightOff'

export default class StreamComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    }
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this)
    this.toggleSound = this.toggleSound.bind(this)
    this.handleCaption = this.handleCaption.bind(this)
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm })
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound })
  }

  handleCaption() {
    console.log('하아')
  }
  render() {
    return (
      <div className="OT_widget-container rounded-2xl">
        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="bg-black h-auto">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />

            <div className="bottom-0  relative bg-red text-white flex ">
              {this.props.user.type == 'local' ? (
                <div className="left-3  flex font-bold bottom-[10px] absolute">
                  <div className="bg-white text-2xl font-extrabold">
                    <span className=" bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                      {this.props.user.getNickname()}
                    </span>
                  </div>
                  {this.props.user.getCaption()
                    ? this.props.user.getCaption()
                    : null}
                  {this.props.user.isSpeaking() ? <div>말하는중</div> : null}
                </div>
              ) : (
                <>
                  <div className="bottom-[30px] absolute text-center bg-black bg-opacity-50 w-full">
                    {this.props.user.getCaption() &&
                    this.props.user.isAudioActive() ? (
                      <div className="font-semibold">
                        {this.props.user.getCaption()} (자동자막)
                      </div>
                    ) : null}
                  </div>
                  <div className="left-3 bg-gray-500 flex font-bold bottom-[10px] absolute">
                    {this.props.user.getNickname()}

                    {this.props.user.isSpeaking() == true &&
                    this.props.user.isAudioActive() ? (
                      <div>말하는중</div>
                    ) : null}
                  </div>
                </>
              )}
              <div className="right-3 absolute  bottom-[10px]">
                {!this.props.user.isVideoActive() ? (
                  <div className="px-1 mt-2 bg-primary">
                    <VideocamOff id="statusCam" />
                  </div>
                ) : null}

                {!this.props.user.isAudioActive() ? (
                  <div className="px-1 mt-2 bg-primary">
                    <MicOff id="statusMic" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
