# require 'httparty'
# require "nokogiri"
# require 'json'

# class FrenchTechApi
#   ALL_STARTUP_URL = "https://ecosystem.lafrenchtech.com/companies.startups/f/company_status/anyof_closed_low-activity/data_type/anyof_Verified/locations/allof_France?showGrid=false".freeze
#   HEADERS = {
#     "accept": "*/*",
#     "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6,tr;q=0.5",
#     "content-type": "application/json",
#     "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
#     "sec-ch-ua-mobile": "?0",
#     "sec-ch-ua-platform": "\"Windows\"",
#     "sec-fetch-dest": "empty",
#     "sec-fetch-mode": "cors",
#     "sec-fetch-site": "cross-site",
#     "x-dealroom-app-id": "060818060",
#     "x-requested-with": "XMLHttpRequest",
#     "referrer": "https://ecosystem.lafrenchtech.com/",
#     "referrerPolicy": "strict-origin-when-cross-origin",
#     "mode": "cors",
#     "credentials": "omit"
#   }

#   def self.get_startups
#     body = {}
#     response = HTTParty.get(ALL_STARTUP_URL, headers: HEADERS)
#     p response
#   end
