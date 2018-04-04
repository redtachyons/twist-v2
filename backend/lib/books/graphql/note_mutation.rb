module Books
  module GraphQL
    NoteMutationType = ::GraphQL::ObjectType.define do
      name "NoteMutation"

      field :note, NoteType do
        argument :elementID, !types.String
        argument :text, !types.String

        resolve Resolvers::Notes::Submit.new
      end
    end
  end
end
