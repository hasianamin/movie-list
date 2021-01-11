import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

const MovieCard=(props)=>{

    const {id,title,showTime,image,like} = props.movie

    return (
        <Card key={id}>
            <CardImg top width="100%" src={image} alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{showTime}</CardSubtitle>
                <CardText>Like: {like}</CardText>
            </CardBody>
        </Card>
    )
}

export default MovieCard