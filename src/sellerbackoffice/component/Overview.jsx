import { BarChart } from '@mantine/charts';
import "./css/Overview.css"

const data = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: 'February', Smartphones: 1050, Laptops: 1200, Tablets: 400 },
    { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

const Overview = () =>{
    return(
        <div className='container'>
            <h1>Overview</h1>
            <div className='chart'>
                <h3>월별 판매액</h3>
                <BarChart
                h={300}
                w={1000}
                data={data}
                dataKey="month"
                orientation="vertical"
                yAxisProps={{ width: 80 }}
                barProps={{ radius: 10 }}
                series={[{ name: 'Smartphones', color: 'blue' }]}/>
            </div>
            <div className='latest-container'>
                <div className='p-list'>
                    <h3>Product-List</h3>
                </div>
                <div className='o-list'>
                    <h3>Order-List</h3>
                </div>
            </div>
        </div>
    );  
};

export default Overview;