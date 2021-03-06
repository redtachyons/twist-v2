module Web
  module GraphQL
    module Mutations
      module Note
        class Submit
          def call(_obj, args, ctx)
            ctx[:note_repo].create(
              state: "open",
              user_id: ctx[:current_user].id,
              element_id: args["elementID"],
              text: args["text"],
            )
          end
        end

        class Close
          def call(_obj, args, ctx)
            ctx[:note_repo].close(args["id"])
          end
        end

        class Open
          def call(_obj, args, ctx)
            ctx[:note_repo].open(args["id"])
          end
        end
      end
    end
  end
end
