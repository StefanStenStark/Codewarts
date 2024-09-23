/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as QuizdropImport } from './routes/quizdrop'
import { Route as QuestionsImport } from './routes/questions'
import { Route as ProfileImport } from './routes/profile'
import { Route as AdventuresImport } from './routes/adventures'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as QuizPassedImport } from './routes/quiz.passed'
import { Route as QuizFailedImport } from './routes/quiz.failed'
import { Route as QuizQuizIdImport } from './routes/quiz.$quizId'

// Create/Update Routes

const QuizdropRoute = QuizdropImport.update({
  path: '/quizdrop',
  getParentRoute: () => rootRoute,
} as any)

const QuestionsRoute = QuestionsImport.update({
  path: '/questions',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const AdventuresRoute = AdventuresImport.update({
  path: '/adventures',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const QuizPassedRoute = QuizPassedImport.update({
  path: '/quiz/passed',
  getParentRoute: () => rootRoute,
} as any)

const QuizFailedRoute = QuizFailedImport.update({
  path: '/quiz/failed',
  getParentRoute: () => rootRoute,
} as any)

const QuizQuizIdRoute = QuizQuizIdImport.update({
  path: '/quiz/$quizId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/adventures': {
      id: '/adventures'
      path: '/adventures'
      fullPath: '/adventures'
      preLoaderRoute: typeof AdventuresImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/questions': {
      id: '/questions'
      path: '/questions'
      fullPath: '/questions'
      preLoaderRoute: typeof QuestionsImport
      parentRoute: typeof rootRoute
    }
    '/quizdrop': {
      id: '/quizdrop'
      path: '/quizdrop'
      fullPath: '/quizdrop'
      preLoaderRoute: typeof QuizdropImport
      parentRoute: typeof rootRoute
    }
    '/quiz/$quizId': {
      id: '/quiz/$quizId'
      path: '/quiz/$quizId'
      fullPath: '/quiz/$quizId'
      preLoaderRoute: typeof QuizQuizIdImport
      parentRoute: typeof rootRoute
    }
    '/quiz/failed': {
      id: '/quiz/failed'
      path: '/quiz/failed'
      fullPath: '/quiz/failed'
      preLoaderRoute: typeof QuizFailedImport
      parentRoute: typeof rootRoute
    }
    '/quiz/passed': {
      id: '/quiz/passed'
      path: '/quiz/passed'
      fullPath: '/quiz/passed'
      preLoaderRoute: typeof QuizPassedImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/adventures': typeof AdventuresRoute
  '/profile': typeof ProfileRoute
  '/questions': typeof QuestionsRoute
  '/quizdrop': typeof QuizdropRoute
  '/quiz/$quizId': typeof QuizQuizIdRoute
  '/quiz/failed': typeof QuizFailedRoute
  '/quiz/passed': typeof QuizPassedRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/adventures': typeof AdventuresRoute
  '/profile': typeof ProfileRoute
  '/questions': typeof QuestionsRoute
  '/quizdrop': typeof QuizdropRoute
  '/quiz/$quizId': typeof QuizQuizIdRoute
  '/quiz/failed': typeof QuizFailedRoute
  '/quiz/passed': typeof QuizPassedRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/adventures': typeof AdventuresRoute
  '/profile': typeof ProfileRoute
  '/questions': typeof QuestionsRoute
  '/quizdrop': typeof QuizdropRoute
  '/quiz/$quizId': typeof QuizQuizIdRoute
  '/quiz/failed': typeof QuizFailedRoute
  '/quiz/passed': typeof QuizPassedRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/adventures'
    | '/profile'
    | '/questions'
    | '/quizdrop'
    | '/quiz/$quizId'
    | '/quiz/failed'
    | '/quiz/passed'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/adventures'
    | '/profile'
    | '/questions'
    | '/quizdrop'
    | '/quiz/$quizId'
    | '/quiz/failed'
    | '/quiz/passed'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/adventures'
    | '/profile'
    | '/questions'
    | '/quizdrop'
    | '/quiz/$quizId'
    | '/quiz/failed'
    | '/quiz/passed'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  AdventuresRoute: typeof AdventuresRoute
  ProfileRoute: typeof ProfileRoute
  QuestionsRoute: typeof QuestionsRoute
  QuizdropRoute: typeof QuizdropRoute
  QuizQuizIdRoute: typeof QuizQuizIdRoute
  QuizFailedRoute: typeof QuizFailedRoute
  QuizPassedRoute: typeof QuizPassedRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  AdventuresRoute: AdventuresRoute,
  ProfileRoute: ProfileRoute,
  QuestionsRoute: QuestionsRoute,
  QuizdropRoute: QuizdropRoute,
  QuizQuizIdRoute: QuizQuizIdRoute,
  QuizFailedRoute: QuizFailedRoute,
  QuizPassedRoute: QuizPassedRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/adventures",
        "/profile",
        "/questions",
        "/quizdrop",
        "/quiz/$quizId",
        "/quiz/failed",
        "/quiz/passed"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/adventures": {
      "filePath": "adventures.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/questions": {
      "filePath": "questions.tsx"
    },
    "/quizdrop": {
      "filePath": "quizdrop.tsx"
    },
    "/quiz/$quizId": {
      "filePath": "quiz.$quizId.tsx"
    },
    "/quiz/failed": {
      "filePath": "quiz.failed.tsx"
    },
    "/quiz/passed": {
      "filePath": "quiz.passed.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
