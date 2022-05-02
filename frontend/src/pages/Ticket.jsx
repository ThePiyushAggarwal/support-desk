import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  }, [dispatch, isError, message, ticketId])

  // Close Ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h2>Sometihig wennne wrong</h2>
  }

  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url="/tickets" />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        {ticket.status !== 'closed' && (
          <button onClick={onTicketClose} className="btn btn-block btn-danger">
            Close Ticket
          </button>
        )}
      </div>
    </>
  )
}

export default Ticket