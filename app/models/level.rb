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
    case self.index
    when 1
      # Niveau 1 : Win si € > 105 €
      if params[:level][:funds].to_i > 2000
        true
      else
        false
      end
    when 2
      # Niveau 2 : Win si € > 120 €
      if params[:level][:funds].to_i > 120
        true
      else
        false
      end
    when 3
      # Niveau 3 : Win si € > 130 €
      if params[:level][:funds].to_i > 130
        true
      else
        false
      end
    when 4
      # Niveau 4 : Win si € > 140 €
      if params[:level][:funds].to_i > 140
        true
      else
        false
      end
    else
      # Gérer les autres niveaux (facultatif)
      false
    end
  end


end
