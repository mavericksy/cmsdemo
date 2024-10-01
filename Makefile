#
SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

ifeq ($(origin .RECIPEPREFIX), undefined)
  $(error This Make does not support .RECIPEPREFIX. Please use GNU Make 4.0 or later)
endif
.RECIPEPREFIX = >

.PHONY: dev-install
dev-install:
> npm install
> pushd cmsdemo;npm install;popd

.PHONY: build
build:
>

.PHONY: run
run:
> node app.js &
> pushd cmsdemo
> npm start
