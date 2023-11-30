class Level < ApplicationRecord
  has_many :attempts


  def self.max_level_reached(project_id)
    max_level = joins(:attempts)
      .where('attempts.project_id = ? AND attempts.result = ?', project_id, true)
      .maximum(:index)

    max_level || 0
  end


end
