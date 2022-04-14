import React, { Component } from 'react'
import './StreamComponent.css'
import Ratio from 'react-ratio'
export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props)
    this.videoRef = React.createRef()
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log('PROPS: ', this.props)
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on('signal:userChanged', event => {
        const data = JSON.parse(event.data)
        if (data.isScreenShareActive !== undefined) {
          this.props.user
            .getStreamManager()
            .addVideoElement(this.videoRef.current)
        }
      })
    }
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current)
    }
  }

  render() {
    return (
      <>
        <Ratio ratio={16 / 9}>
          <video
            autoPlay={true}
            ref={this.videoRef}
            muted={this.props.mutedSound}
            className=" h-full mx-auto"
          />
          {this.props.user.isSpeaking() ? (
            <div className="absolute bottom-0 rounded-xl  border   border-emerald-400 border-8  w-full h-full"></div>
          ) : null}
        </Ratio>
      </>
    )
  }
}
