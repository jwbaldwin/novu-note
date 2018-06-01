
[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/jwbaldwin)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee1fdd01649596943575/maintainability)](https://codeclimate.com/github/jwbaldwin/neuro-note/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ee1fdd01649596943575/test_coverage)](https://codeclimate.com/github/jwbaldwin/neuro-note/test_coverage)
[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
# Neuro Note

An application for slack that combines productivity with creativity using neural networks to help you write less, think better, and do more.

Visit the site at: www.novunote.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

------------------
#### DEVELOPMENT
in /frontend
```
yarn run
```
in root
```
python manage.py runserver
```

--------------
#### PRODUCTION
in /frontend
```
yarn build
```
in root
```
python manage.py runserver --settings=neuro.production_settings
```

### Prerequisites

Python 3.6.5
Django 2.0.5
PostgreSQL
TensorFlow
Keras
HerokuCli

```
$ brew install < >
```

### Installing
//TODO: Flush these steps out

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

Frontend:
```
yarn test
```

Backend:
```
python manage.py test
```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Deployed using heroku's pipeline service in combination with its builtin CI test runner

## Built With

* [Django](https://www.djangoproject.com/) - The web framework
* [Heroku](https://www.heroku.com/what) - The deployment platform and CI service
* [Keras](https://keras.io/) - The neural net API
* [TensorFlow](https://www.tensorflow.org/) - The machine learning framework

## Contributing
 //TODO: Add CONTRIBUTING.md

Please read [CONTRIBUTING.md](https://gist.github.com/) for details on our code of conduct, and the process for submitting pull requests to us.

Naming for brranches follows the conventions below. All branches are made from _dev_.

```prefix/short-description-here```

#### Prefix
```
wip       Works in progress; stuff I know won't be finished soon
feat      Feature I'm adding or expanding
bug       Bug fix or experiment
junk      Throwaway branch created to experiment
```

##### Example:
```
$ git checkout -b feat/note-creation-panel
```

## Versioning

We don't use anything special for versioning. Will look into using tools later on in the development process.

## Authors

* **James Baldwin** (https://github.com/jwbaldwin)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration from my frustrating brain
