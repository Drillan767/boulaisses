import { Tabs, Tab } from 'react-bootstrap'
import Bars from './Bars'
import Pie from './Pie'
import Line from './Line'

const GraphTabs = () => {

    return (
        <>
            <Tabs>
                <Tab eventKey={'first'} title='Per day'>
                    <Bars />
                </Tab>
                <Tab eventKey={'second'} title='Per category'>
                    <Pie />
                </Tab>
                <Tab eventKey={'third'} title='Total'>
                    <Line />
                </Tab>
            </Tabs>
        </>
    )
}

export default GraphTabs