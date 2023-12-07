#require 'faker'

Startup.destroy_all
Attempt.destroy_all
Level.destroy_all

startup_data = GetStartupData.new
startup_data.load_data


#localisations = [
#     'Bordeaux',
#     'Toulouse',
#     'Lyon',
#     'Paris',
#     'Lille',
#     'Marseille',
#     'Nice',
#     'Strasbourg',
#     'Madrid',
#     'Barcelone',
#     'Nice',
#     'Nantes',
#     'Grenoble',
#     'Rouen',
#     'Clermont-Ferrand',
#     'Nancy',
#     'Londres',
#     'Berlin',
#     'Milan'
# ]

# fail_reason = [
#   'Mauvaise gestion économique',
#   'Crise financière',
#   'Marché en berne',
#   'Mésentente des collaborateurs',
#   'Secteur trop concurrentiel',
#   'Accumulation de créances clients',
#   'Cause judiciaire'
# ]

# Startup.create!(name: "Luge parisienne", founder: "Pierre Martin", birth_year: 2017, death_year: 2019, employees: 1, localisation: "Paris", sector: "Sport de glisse", fail_reason: "Interdiction des canons à neige par Mme Hidalgo")

# 20.times do
#   year = (2005..2016).to_a.sample
#   startup = Startup.create!(
#     name: Faker::Name.name,
#     founder: Faker::Name.name,
#     birth_year: year,
#     death_year: (year + (1..7).to_a.sample),
#     employees: Faker::Number.between(from: 1, to: 30).to_s,
#     localisation: localisations.sample,
#     sector: Faker::Company.industry,
#     fail_reason: fail_reason.sample,

#   )
# end

#Manque des users

#Manque des projets

#Manque des favoris

#Manque level
# Assume que vous avez un modèle Level avec les attributs :description, :rank, :metrics, :index

# Niveau 1 - Love Money
Level.create(
  description:"

        <p>
            Love Money est une forme de financement où les fonds proviennent de proches, tels que la famille, les amis
            ou d'autres relations personnelles. C'est souvent une source de capital initial pour les startups et les petites
            entreprises.
        </p>
        <p>
            Par exemple, la startup Sami, spécialisée dans la comptabilité carbone, a démarré son parcours avec
            des fonds de Love Money provenant de membres de la famille et d'amis proches.
        </p>",
  name: "Love Money",
  metrics: "funds",
  index: 1,
  min_funds: 2000,
  min_employees: 0
)

# Niveau 2 - Bourse BPI
Level.create(
  description: "
        <p>
        La Bourse French Tech, initiée par Bpifrance, représente une opportunité cruciale pour les entrepreneurs à la recherche de financements et de soutien dans le développement de leur start-up. Ce programme vise à encourager l'innovation et la croissance des jeunes entreprises françaises à fort potentiel. L'accès à la Bourse French Tech offre aux entrepreneurs une visibilité accrue et une reconnaissance au sein de l'écosystème entrepreneurial.
        </p>",
  name: "Bourse BPI",
  metrics: "1000",
  index: 2,
  min_funds: 10000,
  min_employees: 1
)

# Niveau 3 - Série A
Level.create(
  description: "
        <p>
            La Série A est une ronde de financement dans le cycle de vie d'une startup. Elle implique généralement des
            investisseurs institutionnels qui injectent des fonds pour aider l'entreprise à passer à l'échelle.
        </p>
        <p>
            Une illustration de cette étape est la startup BlaBlaCar, qui a attiré des investisseurs de Série A pour accélérer son
            expansion.
        </p>",
  name: "Serie A",
  metrics: "funds",
  index: 3,
  min_funds: 1000000,
  min_employees: 100
)

# Niveau 4 - IPO
Level.create(
  description: "
        <p>
            Une IPO (Introduction en Bourse) est le processus par lequel une entreprise devient publiquement cotée en
            bourse. C'est une étape majeure dans la vie d'une entreprise, offrant la possibilité aux investisseurs du
            grand public d'acheter des actions de l'entreprise.
        </p>
        <p>
            Un exemple célèbre d'IPO est la société OVHcloud, qui a connu un succès fulgurant sur le marché. L'IPO a permis à la
            société de lever des fonds importants.
        </p>",
  name: "IPO",
  metrics: "funds",
  index: 4,
  min_funds: 100000000,
  min_employees: 0
)
