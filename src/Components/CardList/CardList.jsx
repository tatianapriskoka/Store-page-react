import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCardList, deleteCard, changeCard } from "../../store/cardsStore";
import './CardList.scss';

const CardList = () => {
    const url = 'https://fakestoreapi.com/products?limit=15';
    const state = useSelector(store => store.itemListState);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState(false);

    const filterState = filter ? state.filter((item) => item.liked) : state;
    const filterText = filter ? 'Вернуться' : 'Избранное';

    useEffect(() => {
        axios.get(url).then((response) => {
            let items = response.data;
            console.log(items);
            for (let item of items) {
                item.liked = false
            }
            dispatch(addCardList(items));
        })
    }, [dispatch]);


    if (state.length < 1)
        return null;

    const handleLikeStatus = (liked) => {
        return !liked
            ? <img src="/like-empty.svg" alt="like empty pic" />
            : <img src="/like-liked.svg" alt="like liked pic" />
    }

    const onChangeClick = id => dispatch(changeCard(id))

    const onDeleteCard = id => {
        dispatch(deleteCard(id))

    }

    const showNoCard = () => {
        return filterState.length === 0 ? <div className="text"> Нет товаров в избранном </div> : <div></div>
    }

    return (
        <div className="wrapper">
            <button
                className='button-filter'
                onClick={() => setFilter(!filter)}
            >{filterText}
            </button>
            <section>
                {showNoCard()}
                {filterState.map((item) => {
                    return (
                        <div className='card-list-container '
                            key={item.id}
                        >
                            <div >
                                <img
                                    src={item.image}
                                    width='100' alt={item.description} />
                            </div>
                            <div >
                                {item.title}
                            </div>
                            <div>
                                <button className="btn"
                                    onClick={() => onChangeClick(item.id)}
                                >
                                    {handleLikeStatus(item.liked)}
                                </button>
                            </div>
                            <div >
                                <button className="btn"
                                    onClick={() => onDeleteCard(item.id)}
                                >
                                    <img src="/delete_button.svg" alt="delete-button" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </section>
        </div>

    )
}

export default CardList;