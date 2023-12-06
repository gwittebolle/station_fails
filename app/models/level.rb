class Level < ApplicationRecord
  has_many :attempts, dependent: :destroy
  has_one_attached :photo

  def self.max_level_reached(project_id)
    max_level = joins(:attempts)
      .where('attempts.project_id = ? AND attempts.result = ?', project_id, true)
      .maximum(:index)

    max_level || 0
  end

  rails_admin do
    edit do
      field :description do
        render do
          bindings[:view].render :partial => "bootsy_news_content_field", :locals => {:field => self, :form => bindings[:form]}
        end
      end
    end
    show do
      field :content do
        formatted_value do
          value.html_safe
        end
      end
    end
  end

  def win?(params)
    params[:level][:funds].to_i >= self.min_funds && params[:level][:employees].to_i >= self.min_employees
  end
end
