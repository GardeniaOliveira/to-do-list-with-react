// import Input from "./Input"

const Form = ({ handleSubmit, titleForm, setTitle, title, setTime, time }) => {
    return (
        <div className="form-toDo">
            <h2> {titleForm}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="title">Task title: </label>
                    <input
                        type="text"
                        name="title"
                        //get what the user typed
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="time">Duration:</label>
                    <input
                        type="text"
                        name="time"
                        placeholder="duration in hours"
                        //get what the user typed
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        required
                    />
                </div>

                <button type="submit" >CREATE</button>
            </form>
        </div>
    )
}

export default Form