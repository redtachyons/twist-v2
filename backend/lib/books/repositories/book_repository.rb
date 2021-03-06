class BookRepository < Hanami::Repository
  associations do
    has_many :branches
  end

  def create_with_branches(data)
    assoc(:branches).create(data)
  end

  def ordered_by_title_with_branches
    aggregate(:branches).map_to(Book).order { :title }.to_a
  end

  def find_by_permalink(permalink)
    books.where(permalink: permalink).limit(1).one!
  end

  def add_branch(book, data)
    assoc(:branches, book).add(data)
  end
end
