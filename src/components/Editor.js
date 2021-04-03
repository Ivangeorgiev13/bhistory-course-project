import React, { useState } from 'react';

const Editor = (props) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')

    const submitForm = (ev) => {
        ev.preventDefault();
    }

    if (props.currentUser) {
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <form>
                                <fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Заглавие"
                                            value={title}
                                            onChange={(ev) => setTitle(ev.target.value)} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Кратко описание на статия"
                                            value={description}
                                            onChange={(ev) => setDescription(ev.target.value)} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="8"
                                            placeholder="Съдържание..."
                                            value={body}
                                            onChange={(ev) => setBody(ev.target.value)}>
                                        </textarea>
                                    </fieldset>

                                    <button
                                        className="btn btn-lg pull-xs-right btn-primary"
                                        type="button"
                                        onClick={submitForm}>
                                        {"Публикуване"}
                                    </button>

                                </fieldset>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Editor;
