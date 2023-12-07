class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :phone_page]
  before_action :redirect_mobile_users, only: [:phone_page]

  def home
  end

  def index
  end

  def show
  end

  def win
  end

  def phone_page
  end

  private

  def redirect_mobile_users

  end
end
