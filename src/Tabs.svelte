<script>

  import { tick, setContext, onDestroy, onMount  } from 'svelte';
  import { writable } from 'svelte/store';

  /**
   * @typedef {Object} Props
   * @property {number} [selectedTabIndex]
   * @property {import('svelte').Snippet} [children]
   * @property {({selectedTabIndex: number, name: string}) => void} [tabChanged]
   */

  /** @type {Props} */
  let { selectedTabIndex = $bindable(0), children, tabChanged = () => {} } = $props();



  const tabElements = [];
  const tabs = [];
  const panels = [];

  const controls = writable({});
  const labeledBy = writable({});

  const selectedTab = writable(null);
  const selectedPanel = writable(null);

  function removeAndUpdateSelected(arr, item, selectedStore) {
    const index = arr.indexOf(item);
    arr.splice(index, 1);
    selectedStore.update(selected => selected === item ? (arr[index] || arr[arr.length - 1]) : selected);
  }

  function registerItem(arr, item, selectedStore) {
    arr.push(item);
    selectedStore.update(selected => selected || item);
    onDestroy(() => removeAndUpdateSelected(arr, item, selectedStore));
  }

  function selectTab(tab) {
    if (!tab) return;
    let idx = tabs.indexOf(tab);
    if (idx < 0) return;
    selectedTabIndex = idx;

    selectedTab.set(tab);
    selectedPanel.set(panels[selectedTabIndex]);
    panels[selectedTabIndex].rendered = true;
    tabChanged({selectedTabIndex, name: tab.name});
  }

  function selectTabByIndex(idx) {
    if (!tabs.length) return;
    if (idx === selectedTabIndex) return;
    selectTab(tabs[idx]);
  }

  export function selectTabByName(name) {
    if (name == null || !tabs.length) return;
    if (tabs[selectedTabIndex].name === name) return;
    for (let i=0;i<tabs.length;i++) {
      if (tabs[i].name.toUpperCase() === name.toLowerCase()) {
        selectTab(tabs[i]);
        return;
      }
    }
  }

  setContext('TABS', {
    registerTab(tab) {
      registerItem(tabs, tab, selectedTab);
    },

    registerTabElement(tabElement) {
      tabElements.push(tabElement);
    },

    registerPanel(panel) {
      registerItem(panels, panel, selectedPanel);
    },

    selectTab,

    selectedTab,
    selectedPanel,

    controls,
    labeledBy
  });

  onMount(() => {
    selectTab(tabs[selectedTabIndex]);
  });

  tick(() => {
    for (let i = 0; i < tabs.length; i++) {
      controls.update(controlsData => ({...controlsData, [tabs[i].id]: panels[i].id}));
      labeledBy.update(labeledByData => ({...labeledByData, [panels[i].id]: tabs[i].id}));
    }
  });

  $effect.pre(() => {
    selectTabByIndex(selectedTabIndex);
  });

  async function handleKeyDown(event) {
    if (event.target.classList.contains('svelte-tabs__tab')) {
      let selectedIndex = tabs.indexOf($selectedTab);

      switch (event.key) {
        case 'ArrowRight':
          selectedIndex += 1;
          if (selectedIndex > tabs.length - 1) {
            selectedIndex = 0;
          }
          selectTab(tabs[selectedIndex]);
          tabElements[selectedIndex].focus();
          break;

        case 'ArrowLeft':
          selectedIndex -= 1;
          if (selectedIndex < 0) {
            selectedIndex = tabs.length - 1;
          }
          selectTab(tabs[selectedIndex]);
          tabElements[selectedIndex].focus();
      }
    }
  }
</script>

<div class="svelte-tabs" onkeydown={handleKeyDown} role="tablist" tabindex="0">
  {@render children?.()}
</div>
