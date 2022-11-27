import Form from './dashboard/Form'
import List from './dashboard/List'
import useAuthStore from '../stores/auth'
import Tabs from './graphs/Tabs'

const Dashboard = () => {

    const [logout] = useAuthStore((state) => [state.logout])

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary" onClick={logout}>
                    Logout
                </button>
            </div>

            <h1 className="text-center">
                DÉPENSES
            </h1>

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