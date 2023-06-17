import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useSearchParams } from 'react-router-dom';
import { getProductSearchApi } from '../../redux/reducers/productReducer';

export default function Nhap() {

    const keywordRef = useRef('');
    const { arrproductSearch } = useSelector(state => state.productReducer);

    const dispatch = useDispatch();


    const getInProductApi = () => {
        const action = getProductSearchApi();
        dispatch(action);
    }


    const [keyword, setKeyword] = useSearchParams();

    useEffect(() => {
        //Lấy ra keyword => khác rổng thì mới gọi api
        const kWord = keyword.get('k');
        if (kWord !== '') {
            getProductSearchApi(kWord);
        }


    }, [keyword.get('k')]) //keyword trên url thay đổi thì useeffect này sẽ chạy

    const handleChange = (e) => {
        const { id, value } = e.target;
        keywordRef.current = value;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //đưa keyword lên param
        setKeyword({
            k: keywordRef.current
        });

    }

    return (
        <div className='container'>
            <h3>Tìm kiếm sản phẩm</h3>
            <form className='form-group' onSubmit={handleSubmit}>
                <input id="keyword" className='form-control' onInput={handleChange} />

                <button className='btn btn-dark'>Search</button>
            </form>
            <h3>Kết quả tìm thấy ({arrproductSearch.length})</h3>
            <div className='row'>
                {arrproductSearch.map((item, index) => {
                    return <div className='col-4 mt-2' key={index}>
                        <div className='card'>
                            <img src={item.image} alt="..." />
                            <div className='card-body'>
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                                <NavLink className={"btn btn-dark"} to={`/detail/${item.id}`}>
                                    View detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}
