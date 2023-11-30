require 'faker'

Startup.destroy_all
Attempt.destroy_all
Level.destroy_all


localisations = [
    'Bordeaux',
    'Toulouse',
    'Lyon',
    'Paris',
    'Lille',
    'Marseille',
    'Nice',
    'Strasbourg',
    'Madrid',
    'Barcelone',
    'Nice',
    'Nantes',
    'Grenoble',
    'Rouen',
    'Clermont-Ferrand',
    'Nancy',
    'Londres',
    'Berlin',
    'Milan'
]

fail_reason = [
  'Mauvaise gestion économique',
  'Crise financière',
  'Marché en berne',
  'Mésentente des collaborateurs',
  'Secteur trop concurrentiel',
  'Accumulation de créances clients',
  'Cause judiciaire'
]


20.times do
  year = (2005..2016).to_a.sample
  startup = Startup.create!(
    name: Faker::Name.name,
    founder: Faker::Name.name,
    birth_year: year,
    death_year: (year + (1..7).to_a.sample),
    employees_range: Faker::Number.between(from: 1, to: 30).to_s,
    localisation: localisations.sample,
    sector: Faker::Company.industry,
    fail_reason: fail_reason.sample,
  )
end

#Manque des users

#Manque des projets

#Manque des favoris

#Manque level
# Assume que vous avez un modèle Level avec les attributs :description, :rank, :metrics, :index

# Niveau 1 - Love Money
Level.create(
  description:"
        <h1>Niveau 1 - Love Money</h1>
        <p>
            Love Money est une forme de financement où les fonds proviennent de proches, tels que la famille, les amis
            ou d'autres relations personnelles. C'est souvent une source de capital initial pour les startups et les petites
            entreprises.
        </p>
        <p>
            Par exemple, la startup PayFit, spécialisée dans les solutions de paie en ligne, a démarré son parcours avec
            des fonds de Love Money provenant de membres de la famille et d'amis proches.
        </p>",
  rank: 1,
  metrics: "funds",
  index: 1
)

# Niveau 2 - Bourse BPI
Level.create(
  description: "<h1>Niveau 2 - Bourse BPI</h1>
        <p>
            La Bourse BPI (Banque Publique d'Investissement) est une plateforme permettant aux entreprises d'accéder à des
            financements via le marché boursier. C'est une étape importante pour les entreprises en croissance qui cherchent
            à lever des fonds de manière plus large.
        </p>
        <p>
            Un exemple notable est la startup Criteo, qui a réussi à lever des fonds significatifs en entrant sur le marché
            boursier grâce à la Bourse BPI.
        </p>",
  rank: 1,
  metrics: "funds",
  index: 2
)

# Niveau 3 - Série A
Level.create(
  description: "<h1>Niveau 3 - Série A</h1>
        <p>
            La Série A est une ronde de financement dans le cycle de vie d'une startup. Elle implique généralement des
            investisseurs institutionnels qui injectent des fonds pour aider l'entreprise à passer à l'échelle.
        </p>
        <p>
            Une illustration de cette étape est la startup BlaBlaCar, qui a attiré des investisseurs de Série A pour accélérer son
            expansion.
        </p>",
  rank: 1,
  metrics: "funds",
  index: 3
)

# Niveau 4 - IPO
Level.create(
  description: "<h1>Niveau 4 - IPO</h1>
        <p>
            Une IPO (Introduction en Bourse) est le processus par lequel une entreprise devient publiquement cotée en
            bourse. C'est une étape majeure dans la vie d'une entreprise, offrant la possibilité aux investisseurs du
            grand public d'acheter des actions de l'entreprise.
        </p>
        <p>
            Un exemple célèbre d'IPO est la société Deezer, qui a connu un succès fulgurant sur le marché. L'IPO a permis à la
            société de lever des fonds importants.
        </p>",
  rank: 1,
  metrics: "funds",
  index: 4
)
