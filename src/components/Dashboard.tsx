import Form from './dashboard/Form'
import List from './dashboard/List'
import MonthSelector from './dashboard/MonthSelector'
import useAuthStore from '../stores/auth'
import useMonthsStore from '../stores/months'
import Tabs from './graphs/Tabs'

const Dashboard = () => {

    const [logout] = useAuthStore((state) => [state.logout])
    const [currentMonth] = useMonthsStore((state) => [state.currentMonth])

    return (
        <div className="container-fluid">
            <div className="row mt-2">
                <MonthSelector />
                <div className="ms-auto col-sm-1">
                    <button className="btn btn-primary" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            {
                currentMonth.value &&
                <h1 className="text-center my-4">
                    SPENDINGS FOR {currentMonth.value.toUpperCase()}
                </h1>
            }


            <Form />

            <div className="row mt-5">
                <div className="col-6">
                    <List />
                </div>
                <div className="col-6">
                    <Tabs />
                </div>

            </div>


        </div>
    )
}

export default Dashboard                                                                                                                                                                                                        