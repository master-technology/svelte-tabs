<script>
  import { getContext } from 'svelte';

  import getId from './id';

  /**
   * @typedef {Object} Props
   * @property {boolean} [delay]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { delay = true, children } = $props();

  const panel = {
    id: getId(),
    rendered: !(delay === true ? delay : delay === "true")
  };

  const { registerPanel, selectedPanel, labeledBy } = getContext('TABS');
  registerPanel(panel);
</script>

<style>
  .svelte-tabs__tab-panel {
    margin-top: 0.5em;
  }
</style>

<div 
  id={panel.id}
  aria-labelledby={$labeledBy[panel.id]}
  class="svelte-tabs__tab-panel"
  role="tabpanel" hidden={$selectedPanel !== panel}>
    {#if $selectedPanel === panel || panel.rendered}
    {@render children?.()}
    {/if}
</div>
