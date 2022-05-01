import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import Ticket from './Ticket'

function Tickets() {
  const { tickets, isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTickets())
  }, [dispatch, message, isError])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <p>No Tickets available. Call nunu directly</p>
        )}
      </div>
    </>
  )
}

export default Tickets
