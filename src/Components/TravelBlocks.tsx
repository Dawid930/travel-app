import React from 'react'
import { Card } from 'antd';
import { Travels } from '../Interface/Travel';
import { Link } from 'react-router-dom';
import data from '../Data';
import { HomeOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { StandardButton } from './Style';


//<Link to={`/travels/${travel.id}`} />

const TravelBlocks= () => {
    

  return (
    <div className='travel-list'>
      {data.map((travel) => (
            <div className="site-card-border-less-wrapper" key={travel.id}>
                <Card title={travel.title} bordered={false} style={{ width: 300 }}>
                    <h4>{travel.country}</h4>
                    <h4>{travel.location}</h4>
                    <h4>{travel.description}</h4>
                    <h4>{JSON.stringify(travel.dateRange.start)}</h4>
                    <h5>{travel.author}</h5>
                    <Link to={`/travels/${travel.id}`}>
                    <StandardButton>More details</StandardButton>
                    </Link>
                </Card>
            </div>
        ))}
        <Link to={`/create`}>
            <div className="plus-card">
                <Card bordered={false} style={{ width: 300 }}>
                    <PlusOutlined style={{ fontSize: '100px', color: 'red' }} />
                    <h3>Add new journey</h3>
                </Card>
            </div>
        </Link>
    </div>
);
}

export default TravelBlocks