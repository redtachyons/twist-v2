// @flow
import React, { Component } from 'react'
import NoteForm from './note_form'

type BareElementProps = {
  id: string,
  content: string,
  tag: string,
  image: {
    path: string
  }
}

class BareElement extends Component<BareElementProps> {
  createMarkup() {
    return { __html: this.props.content }
  }

  render() {
    const { tag, image, id } = this.props
    if (tag === 'img') {
      return (
        <div className="element image" id={id}>
          <img src={image.path} />
        </div>
      )
    }

    return <div className="element" id={id} dangerouslySetInnerHTML={this.createMarkup()} />
  }
}

type CommitProps = {
  sha: string,
  branch: {
    name: string
  }
}

type ChapterProps = {
  part: string,
  position: string,
  title: string,
  commit: CommitProps
}

export type ElementWithInfoProps = BareElementProps & {
  chapter: ChapterProps
}

export class ElementWithInfo extends Component<ElementWithInfoProps> {
  renderChapterTitle(chapter: ChapterProps) {
    const { part, position, title } = chapter

    if (part === 'mainmatter') {
      return `${position}. ${title}`
    } else {
      return title
    }
  }

  renderCommitInfo(commit: CommitProps) {
    const { sha, branch: { name } } = commit

    return (
      <span>
        &nbsp;on {name} @ {sha.slice(0, 8)}
      </span>
    )
  }

  render() {
    const { chapter } = this.props

    return (
      <div className="element">
        <BareElement {...this.props} className="bare-element" />
        <span className="chapter-info">
          From {this.renderChapterTitle(chapter)}
          {this.renderCommitInfo(chapter.commit)}
        </span>
      </div>
    )
  }
}

type ElementState = {
  showForm: boolean,
  noteCount: number
}

export type ElementProps = BareElementProps & {
  noteCount: number
}

export class Element extends Component<ElementProps, ElementState> {
  constructor(props: ElementProps) {
    super(props)

    this.state = {
      showForm: false,
      noteCount: props.noteCount
    }
  }

  renderNotesCount() {
    const count = this.state.noteCount
    return count === 1 ? '1 note +' : `${count} notes +`
  }

  toggleForm = (e: ?Function) => {
    this.setState({ showForm: !this.state.showForm })
    if (e) {
      e.preventDefault()
    }
  }

  noteSubmitted(noteCount: number) {
    this.toggleForm()
    this.setState({ noteCount: noteCount })
  }

  renderForm() {
    if (!this.state.showForm) {
      return
    }
    return <NoteForm noteSubmitted={this.noteSubmitted} elementID={this.props.id} />
  }

  render() {
    const { id, tag } = this.props
    return (
      <div>
        <a name={id} />
        <span className={`note_button note_button_${tag}`} id={`note_button_${id}`}>
          <a href="#" onClick={this.toggleForm}>
            {this.renderNotesCount()}
          </a>
        </span>
        <BareElement {...this.props} />
        {this.renderForm()}
      </div>
    )
  }
}
