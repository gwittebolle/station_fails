class GetStartupData
  def initialize
    @file_path = Rails.root.join('app/data/data_startup.json')
  end

  def load_data
    data = File.read(@file_path)
    parsed_data = JSON.parse(data)
      parsed_data['items'].each do |item|
      startup_name = item['name']
      startup_country = item['hq_locations'][0]['country']['name']
      startup_city = item['hq_locations'][0]&.dig('city', 'name')
      startup_lat = item['hq_locations'][0]['country']['lat']
      startup_long = item['hq_locations'][0]['country']['lon']
      startup_birth_year = item['create_date']
      startup_death_year = item['kpi_summary']['last_update_date']
      startup_funds = item['total_funding_enhanced']['amount']
      startup_founder = item['founders']&.first&.fetch('name', nil)
      startup_founders_number = (item['founders']&.map { |founder| founder['name'] } || []).size
      startup_logo = item['images']['100x100']
      startup_employees = item['employees']&.to_s
      startup_description = item['tagline']
      startup_sector = item['industries']&.first&.fetch('name', nil)

      Startup.create!(name: startup_name,
                      founder: startup_founder,
                      logo: startup_logo,
                      employees: startup_employees,
                      localisation: startup_city,
                      birth_year: startup_birth_year,
                      death_year: startup_death_year,
                      funds: startup_funds,
                      description: startup_description,
                      sector: startup_sector,
                      founders_number: startup_founders_number )
     end
  end
end
