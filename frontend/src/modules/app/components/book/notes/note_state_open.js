// @flow
import React from 'react'
import { compose } from 'react-apollo'
import type { NoteProps } from './note'
import { closeNoteMutation } from './close_note_mutation'

type NoteStateOpenProps = NoteProps & {
  closeNote: Function,
  closeNoteMutation: Function
}

class NoteStateOpen extends React.Component<NoteStateOpenProps> {
  async closeNote() {
    this.props.closeNote()

    await this.props.closeNoteMutation({
      variables: {
        id: this.props.id
      }
    })
  }

  render() {
    return (
      <div>
        Note is <span className="open-label">open</span>.{' '}
        <button
          className="btn btn-danger"
          onClick={e => {
            e.preventDefault()
            this.closeNote()
          }}
        >
          Close
        </button>
      </div>
    )
  }
}

export default compose(closeNoteMutation)(NoteStateOpen)
