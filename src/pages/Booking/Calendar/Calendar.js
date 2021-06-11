import { TextField } from "@material-ui/core";
import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar1 from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import "./Calendar.css";
import vnd from '../../../convert/vndong'
const now = new Date()

class Calendar extends Component {
  state = {
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    isOpenModal: false,
    isOpenModal1: false,
    timeBook: [
      {
        time: '7:30 am - 9:30 am'
      },
      {
        time: '10:00 am - 12:00 pm'
      },
      {
        time: '1:00 pm - 3:00 pm'
      },
      {
        time: '3:30 pm - 5:30 pm'
      },
      {
        time: '6:30 pm - 8:30 pm'
      }
    ],
    slots: [5, 5, 5, 5, 5],
    service: [],
    bookHour: null,
    id: "",
    userName: '',
    phone: '',
    totalMoney: ""
  }

  onChange = date => {    //for calendar
    this.setState({ date: date });
    console.log(date)
    axios.post(`/bill/checkSlot`, { date: date }).then(res => {
      this.setState({ slots: res.data })
    })
      .catch(err => console.log(err));
  }


  toggle = (date) => {

    this.setState({
      isOpenModal: !this.state.isOpenModal
    })
  }
  toggleNext = async (e, index) => {
    let arr = Object.values(this.state.timeBook[index]);
    await this.setState({
      isOpenModal: !this.state.isOpenModal,
      isOpenModal1: !this.state.isOpenModal1,
      bookHour: arr[0],
      id: this.state.service[0]._id,
      totalMoney: this.state.service[0].price
    })
  }
  toggleReset = () => {
    this.setState({
      isOpenModal: false,
      isOpenModal1: false
    })
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleChangeService = (e) => {
    let tmp = this.state.service.filter((item) => {
      return item.name == e.target.value
    })
    this.setState({
      id: tmp[0]._id,
      totalMoney: tmp[0].price
    })
  }
  handleSubmit = (e) => {

    let { userName, phone, bookHour, totalMoney, date, id } = this.state;
    if (userName !== "" && phone !== "" && totalMoney !== "" && this.state.id !== "") {
      this.setState({
        isOpenModal: false,
        isOpenModal1: false
      })
      axios.post(`/bill/newBill`, { userName, phone, bookHour, bookDate: date, totalMoney, service: id }).then(res => {
        toast.success('Yêu cầu được chấp nhận, làm ơn kiểm tra email và thanh toán tiền cọc cho chúng tôi để đặt lịch thành công');
      })
        .catch(err => {
          if (err.response.data.message) toast.error(err.response.data.message);
          else toast.error("đặt lịch thất bại")
        });
    }
    else {
      toast.warning('Your information is incomplete');
    }
  }

  componentDidMount() {
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    axios.post(`/bill/checkSlot`, { date: date }).then(res => {
      this.setState({ slots: res.data })
    })
      .catch(err => console.log(err));

    axios.get("/service/").then(res => {
      this.setState({
        service: res.data
      });
    });


    axios.get('/user/profile')
      .then(res => {
        console.log(res.data);
        this.setState({
          userName: res.data.firstName,
          phone: res.data.phone

        })
      })
      .catch(err => {
        console.log(err)
      })


  }

  render() {
    const { timeBook, service, slots } = this.state;

    return (
      <>
        <ToastContainer />
        <div className="overlay_background" style={{ backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/utomhuspool_5.jpg)" }} >
          <div className='overlay_background1'>
            <h2>Booking</h2>
          </div>
        </div>
        <div className="cld container-fluid">
          <div className="leftCalendar">
            <div className="top-leftCalendar">
              <h5 className="top-leftCalendar address">
                ADDRESS
            </h5>
              <span>184 Lê Thanh Nghị Hai Bà Trưng Hà Nội</span>
            </div>
            <div className="bot-leftCalendar">
              <h5>CONNECT TO US</h5>
              <div className="icons">
                <ul className="list-icons">
                  <li className="fb"><a ><i className="fab fa-facebook-f" title="Facebook" /></a></li>
                  <li className="tw"><a ><i className="fab fa-twitter" title="Twitter" /></a></li>
                  <li className="fl"><a ><i className="fab fa-flickr" title="Flickr" /></a></li>
                  <li className="pt"><a ><i className="fab fa-pinterest" title="Pinterest" /></a></li>
                  <li className="ig"><a ><i className="fab fa-instagram" title="Instagram" /></a></li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Calendar1
              onChange={this.onChange}
              value={this.state.date}
              onClickDay={this.toggle}
              locale="en"
              minDate={new Date(now.getFullYear(), now.getMonth(), now.getDate())}
              maxDate={new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10)}
            />
<br/>
<br/>
            <Modal isOpen={this.state.isOpenModal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}><p className="modalHeader">Available Appointments on</p> {moment(this.state.date).format("MMM Do YY")}</ModalHeader>
              <ModalBody>
                {timeBook.map((item, index) => (
                  <div>
                    <div className="timeSlot">
                      <span style={{ marginRight: '10px' }}><i className="fa fa-calendar"></i></span>
                      <span className="timeSlot_hour">{item.time}</span>
                      {slots[index] > 0 && <p className="timeSlot_amount" style={{ color: "green" }}><b >{slots[index]}</b> SPACES AVAILABLE</p>}
                      {slots[index] == 0 && <p className="timeSlot_amount" style={{ color: "orange" }}><b >{slots[index]}</b> SPACES NOT AVAILABLE</p>}
                    </div>
                    {slots[index] > 0 && <Button className="timeSlot_button" style={{ float: 'right' }} onClick={(e) => this.toggleNext(e, index)}>BOOK APPOINTMENT</Button>}
                    {slots[index] == 0 && <Button className="timeSlot_button btn btn-warning" style={{ float: 'right' }} disabled={true} onClick={(e) => this.toggleNext(e, index)}>BOOK APPOINTMENT</Button>}
                  </div>
                ))}

              </ModalBody>
            </Modal>

            <Modal isOpen={this.state.isOpenModal1} toggle={this.toggleReset} >
              <ModalHeader toggle={this.toggleReset}>BOOKING</ModalHeader>
              <ModalBody>
                <form noValidate autoComplete="off">
                  <TextField id="filled-basic" style={{ width: '100%' }} name="userName" onChange={this.handleChange} defaultValue={this.state.userName} label="Name" variant="filled" />
                  <TextField id="filled-basic" style={{ width: '100%' }} name="phone" onChange={this.handleChange} defaultValue={this.state.phone} label="Phone" variant="filled" />
                  <TextField
                    id="standard-select-currency-native"
                    style={{ width: '100%' }}
                    select
                    // label="Service"
                    // value={currency}
                    variant="filled"
                    SelectProps={{
                      native: true,
                    }}
                    onChange={this.handleChangeService}
                  >
                    {service.map((option, index) => (
                      <option key={index}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                  <br />
                  <br />
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <h4>Chi phí: </h4>
                    <h4 style={{ textAlign: "right" }}>{vnd(this.state.totalMoney)}đ</h4>
                  </div>

                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.handleSubmit}>Submit</Button>{' '}
                <Button color="secondary" onClick={this.toggleReset}>Cancel</Button>
              </ModalFooter>
            </Modal>

          </div>
        </div>
      </>
    );
  }
}

export default Calendar;
