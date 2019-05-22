import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class MeetingEditPage extends Component {
    state = {
        photo: '',
        name: this.props.meetingElement.name,
        date: this.props.meetingElement.date,
        max_participant: this.props.meetingElement.max_participant,
        deadline: this.props.meetingElement.deadline,
        region: this.props.meetingElement.region,
        content: this.props.meetingElement.content,
        tag: this.props.meetingElement.tag,
    }

    meetingSerializer = () => {
        return {
            //photo: this.state.photo,
            name: this.state.name,
            date: this.state.date,
            max_participant: this.state.max_participant,
            deadline: this.state.deadline,
            region: this.state.region,
            content: this.state.content,
            tag: this.state.tag
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        this.props.putMeetingRequest(this.meetingSerializer(), )
    }


    render() {
        return (this.props.requestDone) ? (
            <Redirect to={`/meeting/${this.props.meetingElement.id}/`} />
        ) : (
            <div className="meeting_add_page">
                <fieldset onSubmit={this.onSubmitHandler}>
                    <form>
                        <div>
                            <h2> 사진 </h2>
                            <input
                                type="file" id="photo" onChange={(e)=>this.setState(/* TODO */)}
                            />
                        </div>
                        <div>
                            <h2> 번개 이름 </h2>
                            <input
                                type="text" id="meetingName" value={this.state.name}
                                placeholder="번개의 이름을 입력하세요."
                                onChange={(e)=>this.setState({name : e.target.value})}
                            />
                        </div>
                        <div>
                            <h2> 날짜 </h2>
                            <input
                                type="datetime-local" id="meetingDate" value={this.state.date}
                                placeholder="날짜를 선택하세요.."
                                onChange={(e)=>this.setState({date : e.target.value})}
                            />
                        </div>
                        <div>
                            <h2> 신청 마감일 </h2>
                            <input
                                type="datetime-local" id="dueDate" value={this.state.deadline}
                                onChange={(e)=>this.setState({deadline : e.target.value})}
                            />
                        </div>
                        <div>
                            <h2> 위치 </h2>
                            <input
                                type="text" id="location" value={this.state.region}
                                onChange={(e)=>this.setState({region : e.target.value})}
                            />
                        </div>
                        <div>
                            <h2> 내용 </h2>
                            <input
                                type="text" id="detail" value={this.state.content}
                                onChange={(e)=>this.setState({content : e.target.value})}
                            />
                        </div>
                        <div>
                            <h2> 태그 </h2>
                            <input
                                type="text" id="tag" value={this.state.tag}
                                onChange={(e)=>this.setState({tag : e.target.value})}
                            />
                        </div>
                        <button type="submit"> 번개 수정하기 </button>
                    </form>
                </fieldset>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        requestDone: state.meeting.requestDone,
        meetingElement : state.meeting.meetingElement
    }
}

const mapDispatchToProps = dispatch => {
    return {
        putMeetingRequest : (meeting, index) => {
            dispatch(actions.meeting.postMeetingRequest(meeting, index))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MeetingEditPage)
