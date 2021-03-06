// @flow

import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import { bookWithData } from './container'
import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'

type ChapterLinkProps = {
  bookPermalink: string,
  title: string,
  permalink: string
}

class ChapterLink extends Component<ChapterLinkProps> {
  render() {
    const { bookPermalink, title, permalink } = this.props

    return (
      <li>
        <Link to={`/books/${bookPermalink}/chapters/${permalink}`}>{title}</Link>
      </li>
    )
  }
}

type chapterProps = {
  id: string,
  title: string,
  permalink: string
}

type BookProps = {
  data: {
    book: {
      title: string,
      permalink: string,
      defaultBranch: {
        frontmatter: Array<chapterProps>,
        mainmatter: Array<chapterProps>,
        backmatter: Array<chapterProps>
      }
    }
  }
}

class Book extends Component<BookProps> {
  renderPart(title: string, chapters: Array<chapterProps>) {
    if (chapters.length === 0) {
      return null
    }

    const permalink = this.props.data.book.permalink

    return (
      <div>
        <h3>{title}</h3>
        <ol className="{{title.toLowerCase()}}">
          {chapters.map(chapter => (
            <ChapterLink {...chapter} bookPermalink={permalink} key={chapter.id} />
          ))}
        </ol>
      </div>
    )
  }

  render() {
    const { data: { book } } = this.props

    const { title, permalink, defaultBranch: { frontmatter, mainmatter, backmatter } } = book

    return (
      <div className="row">
        <div className="col-md-7 main">
          <h1>
            <Link to={`/`}>Books</Link> - {title}
          </h1>
          <Link to={`/books/${permalink}/notes`}>Notes for this book</Link>
          <hr />
          {this.renderPart('Frontmatter', frontmatter)}
          {this.renderPart('Mainmatter', mainmatter)}
          {this.renderPart('Backmatter', backmatter)}
        </div>
      </div>
    )
  }
}

export const WrappedBook = compose(bookWithData)(errorWrapper(loadingWrapper(Book)))
export { Book }
