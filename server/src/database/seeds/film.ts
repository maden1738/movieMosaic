import { Knex } from "knex";

const TABLE_NAME = "film";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
     return knex(TABLE_NAME)
          .del()
          .then(() => {
               return knex(TABLE_NAME).insert([
                    {
                         film_id: 278,
                         title: "The Shawshank Redemption",
                         poster_url: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
                         backdrop_url: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
                         release_date: "1994-09-23",
                         rating_count: 26469,
                         rating: 8.706,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                         popularity: 166.375,
                         overview:
                              "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
                    },
                    {
                         backdrop_url: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
                         film_id: 238,

                         overview:
                              "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
                         popularity: 118.608,
                         poster_url: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                         release_date: "1972-03-14",
                         title: "The Godfather",
                         rating: 8.693,
                         rating_count: 20096,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/b6w7gKLQLS2zw4JK0XmKgQ4gnzr.jpg",
                         film_id: 240,

                         overview:
                              "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
                         popularity: 118.417,
                         poster_url: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
                         release_date: "1974-12-20",
                         title: "The Godfather Part II",
                         rating: 8.577,
                         rating_count: 12125,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
                         film_id: 424,

                         overview:
                              "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
                         popularity: 98.015,
                         poster_url: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
                         release_date: "1993-12-15",
                         title: "Schindler's List",
                         rating: 8.6,
                         rating_count: 15526,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
                         film_id: 238,
                         overview:
                              "The defense and the prosecution have rested and the jury is filing into the jury room to decfilm_ide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
                         popularity: 80.57,
                         poster_url: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
                         release_date: "1957-04-10",
                         title: "12 Angry Men",
                         rating: 8.544,
                         rating_count: 8371,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/m4TUa2ciEWSlk37rOsjiSIvZDXE.jpg",
                         film_id: 129,

                         overview:
                              "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
                         popularity: 130.04,
                         poster_url: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
                         release_date: "2001-04-18",
                         title: "Spirited Away",
                         rating: 8.537,
                         rating_count: 16126,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg",
                         film_id: 19404,

                         overview:
                              "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
                         popularity: 44.107,
                         poster_url: "/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg",
                         release_date: "1995-10-20",
                         title: "Dilwale Dulhania Le Jayenge",
                         rating: 8.536,
                         rating_count: 4404,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
                         film_id: 155,

                         overview:
                              "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
                         popularity: 187.94,
                         poster_url: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                         release_date: "2008-07-16",
                         title: "The Dark Knight",
                         rating: 8.516,
                         rating_count: 32220,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/8eihUxjQsJ7WvGySkVMC0EwbPAD.jpg",
                         film_id: 496243,

                         overview:
                              "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incfilm_ident.",
                         popularity: 133.93,
                         poster_url: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                         release_date: "2019-05-30",
                         title: "Parasite",
                         rating: 8.508,
                         rating_count: 17770,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/vxJ08SvwomfKbpboCWynC3uqUg4.jpg",
                         film_id: 497,

                         overview:
                              "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
                         popularity: 94.687,
                         poster_url: "/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
                         release_date: "1999-12-10",
                         title: "The Green Mile",
                         rating: 8.506,
                         rating_count: 16994,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
                         film_id: 372058,

                         overview:
                              "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
                         popularity: 141.581,
                         poster_url: "/q719jXXEzOoYaps6babgKnONONX.jpg",
                         release_date: "2016-08-26",
                         title: "Your Name.",
                         rating: 8.491,
                         rating_count: 11109,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
                         film_id: 680,

                         overview:
                              "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
                         popularity: 91.95,
                         poster_url: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
                         release_date: "1994-09-10",
                         title: "Pulp Fiction",
                         rating: 8.488,
                         rating_count: 27380,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
                         film_id: 122,

                         overview:
                              "As armies mass for a final battle that will decfilm_ide the fate of the world--and powerful, ancient forces of Light and Dark compete to determine the outcome--one member of the Fellowship of the Ring is revealed as the noble heir to the throne of the Kings of Men. Yet, the sole hope for triumph over evil lies with a brave hobbit, Frodo, who, accompanied by his loyal friend Sam and the hfilm_ideous, wretched Gollum, ventures deep into the very dark heart of Mordor on his seemingly impossible quest to destroy the Ring of Power.​",
                         popularity: 133.044,
                         poster_url: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
                         release_date: "2003-12-01",
                         title: "The Lord of the Rings: The Return of the King",
                         rating: 8.5,
                         rating_count: 23634,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/mzfx54nfDPTUXZOG48u4LaEheDy.jpg",
                         film_id: 13,

                         overview:
                              "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
                         popularity: 95.335,
                         poster_url: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
                         release_date: "1994-06-23",
                         title: "Forrest Gump",
                         rating: 8.475,
                         rating_count: 26887,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/Adrip2Jqzw56KeuV2nAxucKMNXA.jpg",
                         film_id: 429,
                         overview:
                              "While the Civil War rages on between the Union and the Confederacy, three men – a quiet loner, a ruthless hitman, and a Mexican bandit – comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.",
                         popularity: 105.082,
                         poster_url: "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
                         release_date: "1966-12-22",
                         title: "The Good, the Bad and the Ugly",
                         rating: 8.465,
                         rating_count: 8378,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/d6UxFCGQxpszcf8mwgGjQ3ynqGl.jpg",
                         film_id: 769,

                         overview:
                              "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kfilm_id who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the gufilm_idance of Jimmy Conway.",
                         popularity: 85.448,
                         poster_url: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
                         release_date: "1990-09-12",
                         title: "GoodFellas",
                         rating: 8.464,
                         rating_count: 12556,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/gwj4R8Uy1GwejKqfofREKI9Jh7L.jpg",
                         film_id: 12477,

                         overview:
                              "In the final months of World War II, 14-year-old Seita and his sister Setsuko are orphaned when their mother is killed during an air rafilm_id in Kobe, Japan. After a falling out with their aunt, they move into an abandoned bomb shelter. With no surviving relatives and their emergency rations depleted, Seita and Setsuko struggle to survive.",
                         popularity: 0.062,
                         poster_url: "/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg",
                         release_date: "1988-04-16",
                         title: "Grave of the Fireflies",
                         rating: 8.46,
                         rating_count: 5320,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/qvZ91FwMq6O47VViAr8vZNQz3WI.jpg",
                         film_id: 346,

                         overview:
                              "A samurai answers a village's request for protection after he falls on hard times. The town needs protection from bandits, so the samurai gathers six others to help him teach the people how to defend themselves, and the villagers provfilm_ide the soldiers with food.",
                         popularity: 57.557,
                         poster_url: "/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg",
                         release_date: "1954-04-26",
                         title: "Seven Samurai",
                         rating: 8.459,
                         rating_count: 3557,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/zoVeIgKzGJzpdG6Gwnr7iOYfIMU.jpg",
                         film_id: 11216,

                         overview:
                              "A filmmaker recalls his childhood, when he fell in love with the movies at his village's theater and formed a deep friendship with the theater's projectionist.",
                         popularity: 59.216,
                         poster_url: "/gCI2AeMV4IHSewhJkzsur5MEp6R.jpg",
                         release_date: "1988-11-17",
                         title: "Cinema Paradiso",
                         rating: 8.451,
                         rating_count: 4244,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg",
                         film_id: 637,

                         overview:
                              "A touching story of an Italian book seller of Jewish ancestry who lives in his own little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II. While locked up he tries to convince his son that the whole thing is just a game.",
                         popularity: 48.403,
                         poster_url: "/74hLDKjD5aGYOotO6esUVaeISa2.jpg",
                         release_date: "1997-12-20",
                         title: "Life Is Beautiful",
                         rating: 8.452,
                         rating_count: 12809,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
                         film_id: 550,
                         overview:
                              'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
                         popularity: 87.908,
                         poster_url: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
                         release_date: "1999-10-15",
                         title: "Fight Club",
                         rating: 8.44,
                         rating_count: 28814,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
                         film_id: 157336,

                         overview:
                              "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
                         popularity: 188.924,
                         poster_url: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                         release_date: "2014-11-05",
                         title: "Interstellar",
                         rating: 8.437,
                         rating_count: 34737,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/uif5fUshJrXyyDzfpzp1DLw3N0S.jpg",
                         film_id: 539,

                         overview:
                              "When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother.",
                         popularity: 51.994,
                         poster_url: "/yz4QVqPx3h1hD1DfqqQkCq3rmxW.jpg",
                         release_date: "1960-06-22",
                         title: "Psycho",
                         rating: 8.433,
                         rating_count: 9826,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/uvitbjFU4JqvMwIkMWHp69bmUzG.jpg",
                         film_id: 598,

                         overview:
                              "In the slums of Rio, two kfilm_ids' paths diverge as one struggles to become a photographer and the other a kingpin.",
                         popularity: 50.48,
                         poster_url: "/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
                         release_date: "2002-08-30",
                         title: "City of God",
                         rating: 8.429,
                         rating_count: 7162,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/6Oa3zTiluBz2W8D2ou1MY16dUiF.jpg",
                         film_id: 510,
                         overview:
                              "A petty criminal fakes insanity to serve his sentence in a mental ward rather than prison. He soon finds himself as a leader to the other patients—and an enemy to the cruel, domineering nurse who runs the ward.",
                         popularity: 45.922,
                         poster_url: "/biejlC9yx8W66KHrD5tp9YiSqmV.jpg",
                         release_date: "1975-11-19",
                         title: "One Flew Over the Cuckoo's Nest",
                         rating: 8.4,
                         rating_count: 10212,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/w2uGvCpMtvRqZg6waC1hvLyZoJa.jpg",
                         film_id: 696374,

                         overview:
                              "An intriguing and sinful exploration of seduction, forbfilm_idden love, and redemption, Gabriel's Inferno is a captivating and wildly passionate tale of one man's escape from his own personal hell as he tries to earn the impossible--forgiveness and love.",
                         popularity: 16.131,
                         poster_url: "/oyG9TL7FcRP4EZ9Vfilm_id6uKzwdndz.jpg",
                         release_date: "2020-05-29",
                         title: "Gabriel's Inferno",
                         rating: 8.418,
                         rating_count: 2402,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/uPYa165sraN2c8gZBM9C47g3JoU.jpg",
                         film_id: 311,

                         overview:
                              "A former Prohibition-era Jewish gangster returns to the Lower East Sfilm_ide of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.",
                         popularity: 57.778,
                         poster_url: "/i0enkzsL5dPeneWnjl1fCWm6L7k.jpg",
                         release_date: "1984-05-23",
                         title: "Once Upon a Time in America",
                         rating: 8.418,
                         rating_count: 5229,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/x2RS3uTcsJJ9IfjNPcgDmukoEcQ.jpg",
                         film_id: 120,

                         overview:
                              "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
                         popularity: 179.612,
                         poster_url: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
                         release_date: "2001-12-18",
                         title: "The Lord of the Rings: The Fellowship of the Ring",
                         rating: 8.414,
                         rating_count: 24576,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/xqaN2WYQclQlqvKvsOcNgOx2vRn.jpg",
                         film_id: 4935,

                         overview:
                              "Sophie, a young milliner, is turned into an elderly woman by a witch who enters her shop and curses her. She encounters a wizard named Howl and gets caught up in his resistance to fighting for the king.",
                         popularity: 198.254,
                         poster_url: "/6pZgH10jhpToPcf0uvyTCPFhWpI.jpg",
                         release_date: "2004-09-09",
                         title: "Howl's Moving Castle",
                         rating: 8.407,
                         rating_count: 9589,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/qGQf2OHIkoh89K8XeKQzhxczf96.jpg",
                         film_id: 324857,

                         overview:
                              'Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spfilm_ider and develops unfathomable powers just like the one and only Spfilm_ider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collfilm_ider created by the madman Wilson "Kingpin" Fisk, causing others from across the Spfilm_ider-Verse to be inadvertently transported to his dimension.',
                         popularity: 125.149,
                         poster_url: "/iiZZdoQBEYBv6film_id8su7ImL0oCbD.jpg",
                         release_date: "2018-12-06",
                         title: "Spfilm_ider-Man: Into the Spfilm_ider-Verse",
                         rating: 8.403,
                         rating_count: 15213,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/jtAI6OJIWLWiRItNSZoWjrsUtmi.jpg",
                         film_id: 724089,

                         overview:
                              "Professor Gabriel Emerson finally learns the truth about Julia Mitchell's film_identity, but his realization comes a moment too late. Julia is done waiting for the well-respected Dante specialist to remember her and wants nothing more to do with him. Can Gabriel win back her heart before she finds love in another's arms?",
                         popularity: 12.323,
                         poster_url: "/x5o8cLZfEXMoZczTYWLrUo1P7UJ.jpg",
                         release_date: "2020-07-31",
                         title: "Gabriel's Inferno: Part II",
                         rating: 8.398,
                         rating_count: 1507,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/zcc0My3G4SYR72VuEYHNcUWkkW0.jpg",
                         film_id: 121,

                         overview:
                              "Frodo Baggins and the other members of the Fellowship continue on their sacred quest to destroy the One Ring--but on separate paths. Their destinies lie at two towers--Orthanc Tower in Isengard, where the corrupt wizard Saruman awaits, and Sauron's fortress at Barad-dur, deep within the dark lands of Mordor. Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
                         popularity: 111.147,
                         poster_url: "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
                         release_date: "2002-12-18",
                         title: "The Lord of the Rings: The Two Towers",
                         rating: 8.397,
                         rating_count: 21359,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/alQqTpmEkxSLgajfEYTsTH6nAKB.jpg",
                         film_id: 40096,

                         overview:
                              "The lively João Grilo and the sly Chicó are poor guys living in the hinterland who cheat a bunch of people in a small town in Northeastern Brazil. When they die, they have to be judged by Christ, the Devil and the Virgin Mary before they are admitted to paradise.",
                         popularity: 23.194,
                         poster_url: "/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
                         release_date: "2000-09-15",
                         title: "A Dog's Will",
                         rating: 8.396,
                         rating_count: 1071,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/aJCtkxLLzkk1pECehVjKHA2lBgw.jpg",
                         film_id: 1891,

                         overview:
                              "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and drofilm_ids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.",
                         popularity: 57.679,
                         poster_url: "/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg",
                         release_date: "1980-05-20",
                         title: "The Empire Strikes Back",
                         rating: 8.391,
                         rating_count: 16616,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/dVr11o9or7AS8AMPfwjSpEU83iU.jpg",
                         film_id: 423,

                         overview:
                              "The true story of pianist Władysław Szpilman's experiences in Warsaw during the Nazi occupation. When the Jews of the city find themselves forced into a ghetto, Szpilman finds work playing in a café; and when his family is deported in 1942, he stays behind, works for a while as a laborer, and eventually goes into hfilm_iding in the ruins of the war-torn city.",
                         popularity: 67.673,
                         poster_url: "/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg",
                         release_date: "2002-09-17",
                         title: "The Pianist",
                         rating: 8.385,
                         rating_count: 8961,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/vNXGrknx4GjWLgmuNTftWZluIUl.jpg",
                         film_id: 244786,

                         overview:
                              "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
                         popularity: 79.213,
                         poster_url: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
                         release_date: "2014-10-10",
                         title: "Whiplash",
                         rating: 8.382,
                         rating_count: 14764,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/fQq1FWp1rC89xDrRMuyFJdFUdMd.jpg",
                         film_id: 761053,

                         overview:
                              "The final part of the film adaption of the erotic romance novel Gabriel's Inferno written by an anonymous Canadian author under the pen name Sylvain Reynard.",
                         popularity: 50.452,
                         poster_url: "/fYtHxTxlhzD4QWfEbrC1rypysSD.jpg",
                         release_date: "2020-11-19",
                         title: "Gabriel's Inferno: Part III",
                         rating: 8.381,
                         rating_count: 1048,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/5lAMQMWpXMsirvtLLvW7cJgEPkU.jpg",
                         film_id: 378064,

                         overview:
                              "Shouya Ishfilm_ida starts bullying the new girl in class, Shouko Nishimiya, because she is deaf. But as the teasing continues, the rest of the class starts to turn on Shouya for his lack of compassion. When they leave elementary school, Shouko and Shouya do not speak to each other again... until an older, wiser Shouya, tormented by his past behaviour, decfilm_ides he must see Shouko once more. He wants to atone for his sins, but is it already too late...?",
                         popularity: 82.726,
                         poster_url: "/tuFaWiqX0TXoWu7DGNcmX3UW7sT.jpg",
                         release_date: "2016-09-17",
                         title: "A Silent Voice: The Movie",
                         rating: 8.377,
                         rating_count: 3843,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/dYjZ27hDw2QFaEIfzbNGwW0IkV9.jpg",
                         film_id: 807,

                         overview:
                              'Two homicfilm_ide detectives are on a desperate hunt for a serial killer whose crimes are based on the "seven deadly sins" in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Sommerset researches each sin in an effort to get insfilm_ide the killer\'s mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.',
                         popularity: 207.431,
                         poster_url: "/6yoghtyTpznpBik8EngEmJskVUO.jpg",
                         release_date: "1995-09-22",
                         title: "Se7en",
                         rating: 8.374,
                         rating_count: 20561,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
                         film_id: 27205,

                         overview:
                              "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task consfilm_idered to be impossible: \"inception\", the implantation of another person's film_idea into a target's subconscious.",
                         popularity: 87.328,
                         poster_url: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
                         release_date: "2010-07-15",
                         title: "Inception",
                         rating: 8.369,
                         rating_count: 36014,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
                         film_id: 569094,

                         overview:
                              "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spfilm_ider-Man is catapulted across the Multiverse, where he encounters the Spfilm_ider Society, a team of Spfilm_ider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spfilm_iders and must set out on his own to save those he loves most.",
                         popularity: 242.651,
                         poster_url: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
                         release_date: "2023-05-31",
                         title: "Spfilm_ider-Man: Across the Spfilm_ider-Verse",
                         rating: 8.356,
                         rating_count: 6526,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/8aEe01VfGtYG2dFy9V5MqyyNPlh.jpg",
                         film_id: 567,

                         overview:
                              "A wheelchair-bound photographer spies on his neighbors from his apartment window and becomes convinced one of them has committed murder.",
                         popularity: 43.975,
                         poster_url: "/ILVF0eJxHMddjxeQhswFtpMtqx.jpg",
                         release_date: "1954-08-01",
                         title: "Rear Window",
                         rating: 8.354,
                         rating_count: 6324,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/aViJxMtIxoL3IkHCauYmFv0oCXh.jpg",
                         film_id: 274,

                         overview:
                              "Clarice Starling is a top student at the FBI's training academy.  Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.  Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
                         popularity: 21.529,
                         poster_url: "/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
                         release_date: "1991-02-14",
                         title: "The Silence of the Lambs",
                         rating: 8.3,
                         rating_count: 15919,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/6qHI1IYj7QlLSCwHRzkL62X175s.jpg",
                         film_id: 73,
                         overview:
                              "Derek Vineyard is paroled after serving 3 years in prison for killing two African-American men. Through his brother, Danny Vineyard's narration, we learn that before going to prison, Derek was a skinhead and the leader of a violent white supremacist gang that committed acts of racial crime throughout L.A. and his actions greatly influenced Danny. Reformed and fresh out of prison, Derek severs contact with the gang and becomes determined to keep Danny from going down the same violent path as he dfilm_id.",
                         popularity: 51.699,
                         poster_url: "/euypWkaYFOLW3e5rLIcTAjWnhhT.jpg",
                         release_date: "1998-07-01",
                         title: "American History X",
                         rating: 8.347,
                         rating_count: 11323,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/gl0jzn4BupSbL2qMVeqrjKkF9Js.jpg",
                         film_id: 128,

                         overview:
                              "Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict.",
                         popularity: 94.365,
                         poster_url: "/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
                         release_date: "1997-07-12",
                         title: "Princess Mononoke",
                         rating: 8.338,
                         rating_count: 7780,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/qknxyRgP6UTmwJ4B9tDAmzHMq7u.jpg",
                         film_id: 92321,

                         overview:
                              "One hot summer day a little girl gets lost in an enchanted forest of the mountain god where spirits resfilm_ide. A young boy appears before her, but she cannot touch him for fear of making him disappear. And so a wondrous adventure awaits...",
                         popularity: 0.023,
                         poster_url: "/mDqzHV8UXWWNpZkoAbKmKX1ZxEE.jpg",
                         release_date: "2011-09-17",
                         title: "Hotarubi no Mori e",
                         rating: 8.322,
                         rating_count: 1085,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/c8Pi8F1FzpNebtgXcSjC9nWCdSW.jpg",
                         film_id: 914,

                         overview:
                              "Dictator Adenofilm_id Hynkel tries to expand his empire while a poor Jewish barber tries to avofilm_id persecution from Hynkel's regime.",
                         popularity: 59.557,
                         poster_url: "/1QpO9wo7JWecZ4NiBuu625FiY1j.jpg",
                         release_date: "1940-10-15",
                         title: "The Great Dictator",
                         rating: 8.321,
                         rating_count: 3268,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/hxSB02ksqnkXY4hPGAXqgO2fL01.jpg",
                         film_id: 105,

                         overview:
                              "Eighties teenager Marty McFly is accfilm_identally sent back in time to 1955, inadvertently disrupting his parents' first meeting and attracting his mother's romantic interest. Marty must repair the damage to history by rekindling his parents' romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985.",
                         popularity: 121.264,
                         poster_url: "/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
                         release_date: "1985-07-03",
                         title: "Back to the Future",
                         rating: 8.318,
                         rating_count: 19495,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/xLMJCCSatxENpHO9rLW9yD8A12C.jpg",
                         film_id: 18491,

                         overview:
                              "Seele orders an all-out attack on NERV, aiming to destroy the Evas before Gendo can trigger Third Impact and Instrumentality under his control.",
                         popularity: 57.368,
                         poster_url: "/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg",
                         release_date: "1997-07-19",
                         title: "Neon Genesis Evangelion: The End of Evangelion",
                         rating: 8.3,
                         rating_count: 1517,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/p47ihFj4A7EpBjmPHdTj4ipyq1S.jpg",
                         film_id: 599,
                         overview:
                              "A hack screenwriter writes a screenplay for a former silent film star who has faded into Hollywood obscurity.",
                         popularity: 22.349,
                         poster_url: "/sC4Dpmn87oz9AuxZ15Lmip0Ftgr.jpg",
                         release_date: "1950-08-10",
                         title: "Sunset Boulevard",
                         rating: 8.315,
                         rating_count: 2500,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/tJRToZBfb52NhF6SMGAe0bWQc6z.jpg",
                         film_id: 207,
                         overview:
                              "At an elite, old-fashioned boarding school in New England, a passionate English teacher inspires his students to rebel against convention and seize the potential of every day, courting the disdain of the stern headmaster.",
                         popularity: 74.42,
                         poster_url: "/hmGAF5NDoYB6S39UONevjHCESOI.jpg",
                         release_date: "1989-06-02",
                         title: "Dead Poets Society",
                         rating: 8.313,
                         rating_count: 10940,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/azAkT1jCMwh4FgzDPJzYCsqnGil.jpg",
                         film_id: 164558,

                         overview:
                              "\"One Direction: This Is Us\" is a captivating and intimate all-access look at life on the road for the global music phenomenon. Weaved with stunning live concert footage, this inspiring feature film tells the remarkable story of Niall, Zayn, Liam, Harry and Louis' meteoric rise to fame, from their humble hometown beginnings and competing on the X-Factor, to conquering the world and performing at London’s famed O2 Arena. Hear it from the boys themselves and see through their own eyes what it's really like to be One Direction.",
                         popularity: 12.724,
                         poster_url: "/cxIoYa7uboxfilm_idvWGxdad6fvgpcH.jpg",
                         release_date: "2013-08-28",
                         title: "One Direction: This Is Us",
                         rating: 8.311,
                         rating_count: 1006,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/jynfI114q3kOAbIiVjVfFFmttU2.jpg",
                         film_id: 101,

                         overview:
                              "Léon, the top hit man in New York, has earned a rep as an effective \"cleaner\". But when his next-door neighbors are wiped out by a loose-cannon DEA agent, he becomes the unwilling custodian of 12-year-old Mathilda. Before long, Mathilda's thoughts turn to revenge, and she consfilm_iders following in Léon's footsteps.",
                         popularity: 218.127,
                         poster_url: "/yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg",
                         release_date: "1994-09-14",
                         title: "Léon: The Professional",
                         rating: 8.309,
                         rating_count: 14454,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/yn6DvHSEXE8Ao3QaNlELpqeSOqx.jpg",
                         film_id: 3782,
                         overview:
                              "Kanji Watanabe is a mfilm_iddle-aged man who has worked in the same monotonous bureaucratic position for decades. Learning he has cancer, he starts to look for the meaning of his life.",
                         popularity: 27.966,
                         poster_url: "/dgNTS4EQDDVfkzJI5msKuHu2Ei3.jpg",
                         release_date: "1952-10-09",
                         title: "Ikiru",
                         rating: 8.307,
                         rating_count: 1090,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/ns4vN9p3Z0inYlhh4q9vYXUw3zp.jpg",
                         film_id: 10494,

                         overview:
                              "Encouraged by her managers, rising pop star Mima takes on a recurring role on a popular TV show, when suddenly her handlers and collaborators begin turning up murdered.",
                         popularity: 47.394,
                         poster_url: "/bee6ZQVaSAUhlBinsP9In8x8vO1.jpg",
                         release_date: "1998-02-28",
                         title: "Perfect Blue",
                         rating: 8.3,
                         rating_count: 2518,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/kSlO1pHpwQfPQdgVPr7dJiJNtJ8.jpg",
                         film_id: 3082,

                         overview:
                              "A bumbling tramp desires to build a home with a young woman, yet is thwarted time and time again by his lack of experience and habit of being in the wrong place at the wrong time..",
                         popularity: 26.938,
                         poster_url: "/uEMekS25hwXrCJOZZ3NKMGcAFJo.jpg",
                         release_date: "1936-02-05",
                         title: "Modern Times",
                         rating: 8.296,
                         rating_count: 3599,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/26SUDI2iKhZTIKcU4ZzezTH1G15.jpg",
                         film_id: 335,

                         overview:
                              "As the railroad builders advance unstoppably through the Arizona desert on their way to the sea, Jill arrives in the small town of Flagstone with the intention of starting a new life.",
                         popularity: 76.286,
                         poster_url: "/qbYgqOczabWNn2XKwgMtVrntD6P.jpg",
                         release_date: "1968-12-21",
                         title: "Once Upon a Time in the West",
                         rating: 8.29,
                         rating_count: 4207,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/n0Cju2Eu3VyrUFl32thblHFWznA.jpg",
                         film_id: 901,

                         overview:
                              "A tramp falls in love with a beautiful blind flower girl. His on-and-off friendship with a wealthy man allows him to be the girl's benefactor and suitor.",
                         popularity: 25.856,
                         poster_url: "/bXNvzjULc9jrOVhGfjcc64uKZmZ.jpg",
                         release_date: "1931-02-01",
                         title: "City Lights",
                         rating: 8.285,
                         rating_count: 2097,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/9Qs9oyn4iE8QtQjGZ0Hp2WyYNXT.jpg",
                         film_id: 28,

                         overview:
                              'At the height of the Vietnam war, Captain Benjamin Willard is sent on a dangerous mission that, officially, "does not exist, nor will it ever exist." His goal is to locate - and eliminate - a mysterious Green Beret Colonel named Walter Kurtz, who has been leading his personal army on illegal guerrilla missions into enemy territory.',
                         popularity: 47.936,
                         poster_url: "/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg",
                         release_date: "1979-08-15",
                         title: "Apocalypse Now",
                         rating: 8.286,
                         rating_count: 8004,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/bGksau9GGu0uJ8DJQ8DYc9JW5LM.jpg",
                         film_id: 77338,

                         overview:
                              "A true story of two men who should never have met – a quadriplegic aristocrat who was injured in a paraglfilm_iding accfilm_ident and a young man from the projects.",
                         popularity: 51.948,
                         poster_url: "/1QU7HKgsQbGpzsJbJK4pAVQV9F5.jpg",
                         release_date: "2011-11-02",
                         title: "The Intouchables",
                         rating: 8.28,
                         rating_count: 16917,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/ch3lDc4xQ9MpsNEpnRhvR8PIxxK.jpg",
                         film_id: 1585,

                         overview:
                              "A holfilm_iday favourite for generations...  George Bailey has spent his entire life giving to the people of Bedford Falls.  All that prevents rich skinflint Mr. Potter from taking over the entire town is George's modest building and loan company.  But on Christmas Eve the business's $8,000 is lost and George's troubles begin.",
                         popularity: 49.32,
                         poster_url: "/bSqt9rhDZx1Q7UZ86dBPKdNomp2.jpg",
                         release_date: "1946-12-20",
                         title: "It's a Wonderful Life",
                         rating: 8.273,
                         rating_count: 4180,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/354kfjVb96mtFALMhBE6jzHGiA2.jpg",
                         film_id: 975,

                         overview:
                              "A commanding officer defends three scapegoats on trial for a failed offensive that occurred within the French Army in 1916.",
                         popularity: 30.628,
                         poster_url: "/3O10X1bVSasrS2NQ186s2tlKvqN.jpg",
                         release_date: "1957-10-25",
                         title: "Paths of Glory",
                         rating: 8.271,
                         rating_count: 2809,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/27ZkYMWynuK2qfilm_idP6awc3MsCaOs.jpg",
                         film_id: 527641,

                         overview:
                              "Seventeen-year-old Stella spends most of her time in the hospital as a cystic fibrosis patient. Her life is full of routines, boundaries and self-control — all of which get put to the test when she meets Will, an impossibly charming teen who has the same illness. There's an instant flirtation, though restrictions dictate that they must maintain a safe distance between them. As their connection intensifies, so does the temptation to throw the rules out the window and embrace that attraction.",
                         popularity: 58.261,
                         poster_url: "/kreTuJBkUjVWePRfhHZuYfhNE1T.jpg",
                         release_date: "2019-03-14",
                         title: "Five Feet Apart",
                         rating: 8.267,
                         rating_count: 5487,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/4YbHir4Ka4kG7WOdh0anXv1iT8s.jpg",
                         film_id: 637920,
                         overview:
                              "Separated from his daughter, a father with an intellectual disability must prove his innocence when he is jailed for the death of a commander's child.",
                         popularity: 36.298,
                         poster_url: "/bOth4QmNyEkalwahfPCfiXjNh1r.jpg",
                         release_date: "2019-10-10",
                         title: "Miracle in Cell No. 7",
                         rating: 8.266,
                         rating_count: 4332,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/88J6waYVTta8Qz3iX3qUeWNA5d5.jpg",
                         film_id: 447362,

                         overview:
                              "A 17 year old finds out that his girlfriend is dying, so he sets out to give her an entire life, in the last year she has left.",
                         popularity: 54.819,
                         poster_url: "/bP7u19opmHXYeTCUwGjlLldmUMc.jpg",
                         release_date: "2020-11-27",
                         title: "Life in a Year",
                         rating: 8.264,
                         rating_count: 1801,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/6rmb35g7XoMCMQtnbH0rUecFZlV.jpg",
                         film_id: 10376,

                         overview:
                              "The story of a virtuoso piano player who lives his entire life aboard an ocean liner. Born and raised on the ship, 1900 (Tim Roth) learned about the outsfilm_ide world through interactions with passengers, never setting foot on land, even for the love of his life. Years later, the ship may be destroyed, and a former band member fears that 1900 may still be aboard, willing to go down with the ship.",
                         popularity: 27.801,
                         poster_url: "/4EKnIjT1IGGFyplaW11lTvXrzI0.jpg",
                         release_date: "1998-10-28",
                         title: "The Legend of 1900",
                         rating: 8.263,
                         rating_count: 2205,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/xGzcusHWxLPvRYSBMeOJOVkdJbj.jpg",
                         film_id: 25237,

                         overview:
                              "The invasion of a village in Byelorussia by German forces sends young Florya into the forest to join the weary Resistance fighters, against his family's wishes. There he meets a girl, Glasha, who accompanies him back to his village. On returning home, Florya finds his family and fellow peasants massacred. His continued survival amfilm_idst the brutal debris of war becomes increasingly nightmarish, a battle between despair and hope.",
                         popularity: 49.76,
                         poster_url: "/qNbMsKVzigERgJUbwf8pKyZogpb.jpg",
                         release_date: "1985-10-17",
                         title: "Come and See",
                         rating: 8.262,
                         rating_count: 1413,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/wXsQvli6tWqja51pYxXNG1LFIGV.jpg",
                         film_id: 8587,

                         overview:
                              "A young lion prince is cast out of his prfilm_ide by his cruel uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days. But when his past comes to haunt him, the young prince must decfilm_ide his fate: Will he remain an outcast or face his demons and become what he needs to be?",
                         popularity: 146.674,
                         poster_url: "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
                         release_date: "1994-06-24",
                         title: "The Lion King",
                         rating: 8.257,
                         rating_count: 17893,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/sdwjQEM869JFwMytTmvr6ggvaUl.jpg",
                         film_id: 670,

                         overview:
                              "With no clue how he came to be imprisoned, drugged and tortured for 15 years, a desperate man seeks revenge on his captors.",
                         popularity: 56.202,
                         poster_url: "/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg",
                         release_date: "2003-11-21",
                         title: "Oldboy",
                         rating: 8.255,
                         rating_count: 8401,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
                         film_id: 299534,

                         overview:
                              "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
                         popularity: 115.506,
                         poster_url: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                         release_date: "2019-04-24",
                         title: "Avengers: Endgame",
                         rating: 8.254,
                         rating_count: 25099,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/mlxKite1x1PgmIhJgAxNS9eHmH8.jpg",
                         film_id: 508965,

                         overview:
                              "When Jesper distinguishes himself as the Postal Academy's worst student, he is sent to Smeerensburg, a small village located on an icy island above the Arctic Circle, where grumpy inhabitants barely exchange words, let alone letters. Jesper is about to give up and abandon his duty as a postman when he meets local teacher Alva and Klaus, a mysterious carpenter who lives alone in a cabin full of handmade toys.",
                         popularity: 26.749,
                         poster_url: "/q125RHUDgR4gjwh1QkfYuJLYkL.jpg",
                         release_date: "2019-11-08",
                         title: "Klaus",
                         rating: 8.247,
                         rating_count: 3910,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
                         film_id: 299536,

                         overview:
                              "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
                         popularity: 197.762,
                         poster_url: "/7WsyChQLEftFfilm_idOVTGkv3hFpyyt.jpg",
                         release_date: "2018-04-25",
                         title: "Avengers: Infinity War",
                         rating: 8.246,
                         rating_count: 29141,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/2Xe9lISpwXKhvKiHttbFfVRERQX.jpg",
                         film_id: 490132,

                         overview:
                              "Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour through the Deep South in the days when African Americans, forced to find alternate accommodations and services due to segregation laws below the Mason-Dixon Line, relied on a gufilm_ide called The Negro Motorist Green Book.",
                         popularity: 48.718,
                         poster_url: "/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg",
                         release_date: "2018-11-16",
                         title: "Green Book",
                         rating: 8.2,
                         rating_count: 11312,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg",
                         film_id: 315162,

                         overview:
                              "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
                         popularity: 219.497,
                         poster_url: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
                         release_date: "2022-12-07",
                         title: "Puss in Boots: The Last Wish",
                         rating: 8.235,
                         rating_count: 7414,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/oA7EHjQPgtPKSrvtNtzA82opnrQ.jpg",
                         film_id: 265177,
                         overview:
                              "A peculiar neighbor offers hope to a recent widow who is struggling to raise a teenager who is unpredictable and, sometimes, violent.",
                         popularity: 18.684,
                         poster_url: "/nT4VJ6MfSwUoCorYmkcLVaIenya.jpg",
                         release_date: "2014-09-19",
                         title: "Mommy",
                         rating: 8.235,
                         rating_count: 2664,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/sQkRiQo3nLrQYMXZodDjNUJKHZV.jpg",
                         film_id: 618344,

                         overview:
                              "Earth is decimated after intergalactic tyrant Darksefilm_id has devastated the Justice League in a poorly executed war by the DC Super Heroes. Now the remaining bastions of good – the Justice League, Teen Titans, Suicfilm_ide Squad and assorted others – must regroup, strategize and take the war to Darksefilm_id in order to save the planet and its surviving inhabitants.",
                         popularity: 41.086,
                         poster_url: "/c01Y4suApJ1Wic2xLmaq1QYcfoZ.jpg",
                         release_date: "2020-05-05",
                         title: "Justice League Dark: Apokolips War",
                         rating: 8.235,
                         rating_count: 1429,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/eNWjMbuhGxJdzaIY9ZZ2KvWx2sQ.jpg",
                         film_id: 110420,

                         overview:
                              "After her werewolf lover unexpectedly dies in an accfilm_ident, a woman must find a way to raise the son and daughter that she had with him. However, their inheritance of their father's traits prove to be a challenge for her.",
                         popularity: 51.158,
                         poster_url: "/3Nllh6JgcrFdtOn6iFOWHudNInd.jpg",
                         release_date: "2012-07-21",
                         title: "Wolf Children",
                         rating: 8.233,
                         rating_count: 2222,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/YLyORLsYIjC0d1TFBSpJKk7piP.jpg",
                         film_id: 504253,

                         overview:
                              "After his classmate and crush is diagnosed with a pancreatic disease, an average high schooler sets out to make the most of her final days.",
                         popularity: 52.032,
                         poster_url: "/qpV8kvRfAntV7D4aOOsLIz7OdPc.jpg",
                         release_date: "2018-09-01",
                         title: "I Want to Eat Your Pancreas",
                         rating: 8.23,
                         rating_count: 1495,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/qjGrUmKW78MCFG8PTLDBp67S27p.jpg",
                         film_id: 635302,

                         overview:
                              "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Fire Hashira, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!",
                         popularity: 176.135,
                         poster_url: "/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
                         release_date: "2020-10-16",
                         title: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
                         rating: 8.225,
                         rating_count: 3783,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/9o9ci7ZH9chSy8B7YXCBYih8Kkd.jpg",
                         film_id: 290098,

                         overview:
                              "In 1930s Korea, a swindler and a young woman pose as a Japanese count and a handmafilm_iden to seduce a Japanese heiress and steal her fortune.",
                         popularity: 101.767,
                         poster_url: "/dLlH4aNHdnmf62umnInL8xPlPzw.jpg",
                         release_date: "2016-06-01",
                         title: "The Handmafilm_iden",
                         rating: 8.225,
                         rating_count: 3613,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/yeJhRNtE4XW2lOoVVFO9iuDr3AL.jpg",
                         film_id: 441130,

                         overview:
                              "In a time of superstition and magic, when wolves are seen as demonic and nature an evil to be tamed, a young apprentice hunter comes to Ireland with her father to wipe out the last pack. But when she saves a wild native girl, their friendship leads her to discover the world of the Wolfwalkers and transform her into the very thing her father is tasked to destroy.",
                         popularity: 26.553,
                         poster_url: "/53VE3Iv9NiCOJfFMWwQuRUQMaXZ.jpg",
                         release_date: "2020-10-26",
                         title: "Wolfwalkers",
                         rating: 8.221,
                         rating_count: 1133,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/1Jpkm9qZcsT0mSyVXgs4VlGjPNI.jpg",
                         film_id: 16869,

                         overview:
                              'In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as "The Basterds" are chosen specifically to spread fear throughout the Third Reich by scalping and brutally killing Nazis. The Basterds, lead by Lt. Aldo Raine soon cross paths with a French-Jewish teenage girl who runs a movie theater in Paris which is targeted by the soldiers.',
                         popularity: 83.825,
                         poster_url: "/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg",
                         release_date: "2009-08-02",
                         title: "Inglourious Basterds",
                         rating: 8.219,
                         rating_count: 21831,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/hND7xAaxxBgaIspp9iMsaEXOSTz.jpg",
                         film_id: 98,

                         overview:
                              "In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into chaos.  Maximus is one of the Roman army's most capable and trusted generals and a key advisor to the emperor.  As Marcus' devious son Commodus ascends to the throne, Maximus is set to be executed.  He escapes, but is captured by slave traders.  Renamed Spaniard and forced to become a gladiator, Maximus must battle to the death with other men for the amusement of paying audiences.",
                         popularity: 97.672,
                         poster_url: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
                         release_date: "2000-05-04",
                         title: "Gladiator",
                         rating: 8.218,
                         rating_count: 18029,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/rW2xRFlJRbTnBJlQTSjQmjevIwb.jpg",
                         film_id: 857,

                         overview:
                              "As U.S. troops storm the beaches of Normandy, three brothers lie dead on the battlefield, with a fourth trapped behind enemy lines. Ranger captain John Miller and seven men are tasked with penetrating German-held territory and bringing the boy home.",
                         popularity: 79.689,
                         poster_url: "/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
                         release_date: "1998-07-24",
                         title: "Saving Private Ryan",
                         rating: 8.217,
                         rating_count: 15474,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/mmd1HnuvAzFc4iuVJcnBrhDNEKr.jpg",
                         film_id: 694,

                         overview:
                              "Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live isolated from the rest of the world for the winter. But they aren't prepared for the madness that lurks within.",
                         popularity: 72.637,
                         poster_url: "/9PtPnOJSH6pewElRlJPGqC5Gd3W.jpg",
                         release_date: "1980-05-23",
                         title: "The Shining",
                         rating: 8.217,
                         rating_count: 17082,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/ppKDBRK4TMHxjLPRGx3MQEtJWC0.jpg",
                         film_id: 37257,

                         overview:
                              "When Leonard Vole is arrested for the sensational murder of a rich, mfilm_iddle-aged wfilm_idow, the famous Sir Wilfrfilm_id Robarts agrees to appear on his behalf. Sir Wilfrfilm_id, recovering from a near-fatal heart attack, is supposed to be on a diet of bland, civil suits—but the lure of the criminal courts is too much for him, especially when the case is so difficult.",
                         popularity: 26.975,
                         poster_url: "/mM5Cad2ESBprh6ucPnMzMfI34Cu.jpg",
                         release_date: "1957-12-17",
                         title: "Witness for the Prosecution",
                         rating: 8.216,
                         rating_count: 1343,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/ncEsesgOJDNrTUED89hYbA117wo.jpg",
                         film_id: 603,

                         overview:
                              "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
                         popularity: 103.742,
                         poster_url: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
                         release_date: "1999-03-31",
                         title: "The Matrix",
                         rating: 8.216,
                         rating_count: 25169,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/AaV1Yfilm_idWKnjAIAOe8UUKBFm327v.jpg",
                         film_id: 361743,

                         overview:
                              "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
                         popularity: 139.41,
                         poster_url: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
                         release_date: "2022-05-21",
                         title: "Top Gun: Maverick",
                         rating: 8.213,
                         rating_count: 8814,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
                         film_id: 354912,

                         overview:
                              "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his film_idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
                         popularity: 146.924,
                         poster_url: "/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
                         release_date: "2017-10-27",
                         title: "Coco",
                         rating: 8.213,
                         rating_count: 18973,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/wyvUmyzqGOBDyqLHRSukGDjI7bH.jpg",
                         film_id: 50014,
                         overview:
                              'Aibileen Clark is a mfilm_iddle-aged African-American mafilm_id who has spent her life raising white children and has recently lost her only son; Minny Jackson is an African-American mafilm_id who has often offended her employers despite her family\'s struggles with money and her desperate need for jobs; and Eugenia "Skeeter" Phelan is a young white woman who has recently moved back home after graduating college to find out her childhood mafilm_id has mysteriously disappeared. These three stories intertwine to explain how life in Jackson, Mississippi revolves around "the help"; yet they are always kept at a certain distance because of racial lines.',
                         popularity: 108.382,
                         poster_url: "/7XLSwxpfpPoJyTdJVot6a42TS2V.jpg",
                         release_date: "2011-08-09",
                         title: "The Help",
                         rating: 8.21,
                         rating_count: 8067,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/rzdQXrK37OBArogzCk7inEaW0mS.jpg",
                         film_id: 284,

                         overview:
                              "Bud Baxter is a minor clerk in a huge New York insurance company, until he discovers a quick way to climb the corporate ladder. He lends out his apartment to the executives as a place to take their mistresses. Although he often has to deal with the aftermath of their visits, one night he's left with a major problem to solve.",
                         popularity: 30.291,
                         poster_url: "/z6QlfbbORwQ2lnaCqbdEZOg3dRx.jpg",
                         release_date: "1960-06-21",
                         title: "The Apartment",
                         rating: 8.2,
                         rating_count: 2212,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/yv7XGQctTMrFM5ZiEm80zk3Jlw2.jpg",
                         film_id: 522924,

                         overview:
                              "A family dog – with a near-human soul and a philosopher's mind – evaluates his life through the lessons learned by his human owner, a race-car driver.",
                         popularity: 40.229,
                         poster_url: "/mi5VN4ww0JZgRFJIaPxxTGKjUg7.jpg",
                         release_date: "2019-08-08",
                         title: "The Art of Racing in the Rain",
                         rating: 8.205,
                         rating_count: 1438,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/xBDE2d6HM1aBKQRu4IT7SfPD9fs.jpg",
                         film_id: 1124,

                         overview:
                              "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.",
                         popularity: 66.091,
                         poster_url: "/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg",
                         release_date: "2006-10-17",
                         title: "The Prestige",
                         rating: 8.205,
                         rating_count: 15642,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/ecvy2kMxsJ60ej52beZ0F8EOGkL.jpg",
                         film_id: 11324,

                         overview:
                              "World War II soldier-turned-U.S. Marshal Teddy Daniels investigates the disappearance of a patient from a hospital for the criminally insane, but his efforts are compromised by troubling visions and a mysterious doctor.",
                         popularity: 81.046,
                         poster_url: "/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
                         release_date: "2010-02-14",
                         title: "Shutter Island",
                         rating: 8.204,
                         rating_count: 23509,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/jNjT5y95BToczcxgVPl1NBB7goY.jpg",
                         film_id: 11,

                         overview:
                              "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
                         popularity: 105.546,
                         poster_url: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
                         release_date: "1977-05-25",
                         title: "Star Wars",
                         rating: 8.204,
                         rating_count: 20229,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/bR4U9n9YnZOvBUhOUNl316UNEyh.jpg",
                         film_id: 185,

                         overview:
                              "In a near-future Britain, young Alexander DeLarge and his pals get their kicks beating and raping anyone they please. When not destroying the lives of others, Alex swoons to the music of Beethoven. The state, eager to crack down on juvenile crime, gives an incarcerated Alex the option to undergo an invasive procedure that'll rob him of all personal agency. In a time when conscience is a commodity, can Alex change his tune?",
                         popularity: 50.224,
                         poster_url: "/4sHeTAp65WrSSuc05nRBKddhBxO.jpg",
                         release_date: "1971-12-19",
                         title: "A Clockwork Orange",
                         rating: 8.202,
                         rating_count: 12581,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/uWVkEo9PWHu9algZsiLPi6sRU64.jpg",
                         film_id: 556574,

                         overview:
                              "Presenting the tale of American founding father Alexander Hamilton, this filmed version of the original Broadway smash hit is the story of America then, told by America now.",
                         popularity: 28.233,
                         poster_url: "/h1B7tW0t399VDjAcWJh8m87469b.jpg",
                         release_date: "2020-07-03",
                         title: "Hamilton",
                         rating: 8.201,
                         rating_count: 1356,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/kTUUiKGKrdRhJsCcYT3Ivtfuuzh.jpg",
                         film_id: 5156,
                         overview:
                              "Unemployed Antonio is elated when he finally finds work hanging posters around war-torn Rome. However on his first day, his bicycle—essential to his work—gets stolen. His job is doomed unless he can find the thief. With the help of his son, Antonio combs the city, becoming desperate for justice.",
                         popularity: 20.543,
                         poster_url: "/rLpveWO1hTNYF9LUZJZgTdq5nyf.jpg",
                         release_date: "1948-07-21",
                         title: "Bicycle Thieves",
                         rating: 8.2,
                         rating_count: 2319,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/yQIBS8B9l2qXoPoPtxSXvH7CfoT.jpg",
                         film_id: 324786,

                         overview:
                              "WWII American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first Conscientious Objector in American history to receive the Congressional Medal of Honor.",
                         popularity: 125.132,
                         poster_url: "/wuz8TjCIWR2EVVMuEfBnQ1vuGS3.jpg",
                         release_date: "2016-10-07",
                         title: "Hacksaw Rfilm_idge",
                         rating: 8.197,
                         rating_count: 13417,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                    {
                         backdrop_url: "/7tBfYcZH4P4AA1oFzjflUTSDZgx.jpg",
                         film_id: 490,

                         overview:
                              "When disillusioned Swedish knight Antonius Block returns home from the Crusades to find his country in the grips of the Black Death, he challenges Death to a chess match for his life. Tormented by the belief that God does not exist, Block sets off on a journey, meeting up with traveling players Jof and his wife, Mia, and becoming determined to evade Death long enough to commit one redemptive act while he still lives.",
                         popularity: 21.214,
                         poster_url: "/j6z3c6dGXtPHUATJX8J7Y70mM1S.jpg",
                         release_date: "1957-02-16",
                         title: "The Seventh Seal",
                         rating: 8.197,
                         rating_count: 2889,
                         trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
               ]);
          });
}
