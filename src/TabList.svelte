<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<style>
	.svelte-tabs__tab-list {
    border-bottom: 1px solid #CCCCCC;
    margin: 0;
    padding: 0;
	}
</style>

<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<ul role="tablist" class="svelte-tabs__tab-list">
  {@render children?.()}
</ul>
