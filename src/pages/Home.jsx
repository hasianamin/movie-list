import './../App.css';
import Header from './../components/Header';
import {Form,FormGroup,Label,Input, Row, Col,Button} from 'reactstrap'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './../components/Card'

const API_URL = 'https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies'

const Home=()=> {

    const [data,setData] = useState(null)
    const [params,setParams] = useState({
        movieName: '',
        date: ''
    })
    const [filterData,setFilterData] = useState(null)

    useEffect(()=>{
        axios.get(API_URL)
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        }).catch((err)=>console.log(err))
    },[])

    const onInputMovieName=(text)=>{
        if(text.target.value) setParams({...params,movieName:text.target.value})
    }

    const onInputDate=(text)=>{
        if(text.target.value) setParams({...params,date:new Date(text.target.value).valueOf()})
    }

    const onSearch=()=>{
        let result
        let unixTimeStamp
        let oneDay = 48*60*60
        if(params.movieName && params.date){
            result = data.filter((val)=>{
                unixTimeStamp = new Date(val.showTime).valueOf()
                return val.title === params.movieName && params.date <= unixTimeStamp
            })
        }
        else if(params.movieName){
            result = data.filter((val)=>{
                return val.title === params.movieName
            })
        }
        else if(params.date){
            result = data.filter((val)=>{
                unixTimeStamp = new Date(val.showTime).valueOf()
                return unixTimeStamp >= params.date
            })
        }
        setFilterData(result)
    }

    const renderMovie=()=>{
        return filterData.map((val,index)=>{
            return (
                <div className='custom-card'>
                    <MovieCard movie={val} key={index}/>
                </div>
            )
        })
    }

    const renderMovieList=()=>{
        return data.map((val,index)=>{
            return(
                <option key={index} value={val.title}>{val.title}</option>
            )
        })
    }

    if(!data){
        return (
            <>
                <Header/>
                <div>Loading</div>
            </>
        )
    }

    return (
        <div>
        <Header/>
        <section>
            <div className="container mt-1">
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input type="select" name="select" id="exampleSelect" value={params.movieName} onChange={onInputMovieName}>
                                    <option hidden>-- Select movie --</option>
                                    {renderMovieList()}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleDate">Date</Label>
                                <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                                onChange={onInputDate}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={1} className='d-flex align-items-center justify-content-center'>
                            <Button onClick={onSearch} style={{marginTop:12}}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <div className="content-body">
                    {
                        filterData? renderMovie() : null
                    }
                </div>
            </div>
        </section>
        </div>
    );
}

export default Home;
