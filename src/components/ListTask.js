import { BsTrash, BsCircle, BsCircleFill } from "react-icons/bs";


const ListTask = ({ toDo, titleList, handleEdit, handleDelete }) => {
    return (
        <div className="list-toDo">
            <h2>{titleList}</h2>
            {toDo.length === 0 && <p>There are not tasks!</p>}
            {toDo.map((toDo) => (
                <div className="toDo" key={toDo.id}>
                    <div className="toDo-title">
                        <h3 className={toDo.done ? "toDo-done" : "toDo"}>{toDo.title}</h3>
                    </div>
                    <div className="toDo-time">
                        <p className="time">{toDo.time}</p>
                    </div>
                    <div className="actions">
                        <span onClick={() => handleEdit(toDo)}>
                            {!toDo.done ? <BsCircle /> : <BsCircleFill />}
                        </span>
                        <BsTrash onClick={() => handleDelete(toDo.id)} />
                    </div>
                </div>
            ))}


        </div>
    )
}

export default ListTask