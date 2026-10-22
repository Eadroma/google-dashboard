/**
 * Widget registry aggregator.
 *
 * Each import triggers the side-effect in *.register.ts which calls registerWidget().
 * To add a new widget: create src/features/my-widget/ then add one import line here.
 * Nothing else needs to change.
 */

import '@features/clock/clock.register';
import '@features/date-display/dateDisplay.register';
import '@features/search-bar/searchBar.register';
import '@features/quick-links/quickLinks.register';
import '@features/todo/todo.register';
import '@features/notes/notes.register';
import '@features/github-activity/githubActivity.register';
