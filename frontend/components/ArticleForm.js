import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

export default function ArticleForm({ postArticle, updateArticle, setCurrentArticleId, currentArticle }) {
  const [values, setValues] = useState({
    title: '',
    text: '',
    topic: '',
  })

  useEffect(() => {
    if (currentArticle) {
      setValues({
        title: currentArticle.title,
        text: currentArticle.text,
        topic: currentArticle.topic,
      })
    }
  }, [currentArticle])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    if (currentArticle) {
      updateArticle(currentArticle.article_id,values)
      // setCurrentArticleId(null) // Move this inside the updateArticle callback
    } else {
      postArticle(values)
    }
    setValues({
      title: '',
      text: '',
      topic: '',
    })
  }

  const isDisabled = () => {
    return !values.title || !values.text || !values.topic
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticle ? "Edit Article" : "Create Article"}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle" type="submit">Submit</button> {/* Added type="submit" */}
        {currentArticle && <button type="button" onClick={() => setCurrentArticleId(null)}>Cancel edit</button>} {/* Added type="button" */}
      </div>
    </form>
  )
}

ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
